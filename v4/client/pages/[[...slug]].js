import delve from "dlv";

import { getDataDependencies } from "./services/api";
import { redirectToHomepage, getData } from "../utils";
import { getLocalizedParams } from "../utils/localize";
import BlockManager from "../components/shared/BlockManager";
const Universals = ({ pageData }) => {
  const blocks = delve(pageData, "blocks");
  // console.log("first block", blocks);
  return <div> {blocks && <BlockManager blocks={blocks} />}</div>;
};

export async function getServerSideProps(context) {
  const { slug, locale } = getLocalizedParams(context.query);

  try {
    const data = getData(slug, locale);

    const res = await fetch(delve(data, "data"));

    const json = await res.json();
    // console.log("json length  is : ", json["data"].length);
    // if (!json["data"].length) {
    //   return redirectToHomepage();
    // }
    // console.log("pageData:", json["data"][0]["attributes"]["blocks"]);

    const pageData = await getDataDependencies(json["data"][0]["attributes"]);
    return {
      props: { pageData },
    };
  } catch (error) {
    return redirectToHomepage();
  }
}

export default Universals;
