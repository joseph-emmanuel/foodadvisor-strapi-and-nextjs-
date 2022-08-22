import delve from "dlv";

import { getDataDependencies } from "./services/api";
import { redirectToHomepage, getData, fetchData } from "../utils";
import { getLocalizedParams } from "../utils/localize";
import BlockManager from "../components/shared/BlockManager";
const Universals = ({ pageData }) => {
  const blocks = delve(pageData, "blocks");
  return <div> {blocks && <BlockManager blocks={blocks} />}</div>;
};

export async function getServerSideProps(context) {
  const { slug, locale } = getLocalizedParams(context.query);

  try {
    const data = getData(slug, locale);
    // const data2 = (await fetch(data)).json();
    console.log("the data is :", slug);
    const res = await fetch(delve(data, "data"));
    const json = await res.json();

    console.log("json data is ", json);
    // if (!json.length) {
    //   return redirectToHomepage();
    // }

    const pageData = await getDataDependencies(delve(json, "0"));
    console.log("page data is :", pageData);
    return {
      props: { pageData },
    };
  } catch (error) {
    return redirectToHomepage();
  }
}

export default Universals;
