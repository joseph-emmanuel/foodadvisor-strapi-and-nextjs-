import delve from "dlv";

import { getDataDependencies } from "../utils/services/api";
import { redirectToHomepage, getData, getDataUrl } from "../utils";
import { getLocalizedParams } from "../utils/localize";
import BlockManager from "../components/shared/BlockManager";
const Universals = ({ pageData }) => {
  const blocks = delve(pageData, "blocks");
  // console.log("first block", blocks);
  return <div> {blocks && <BlockManager blocks={blocks} />}</div>;
};

export async function getStaticPaths() {
  const dataUrl = getDataUrl();
  // console.log("dataUrl", dataUrl);
  const res = await fetch(delve(dataUrl, "data"));

  const data = await res.json();

  // console.log("data is :", data["data"]);
  // const paths = [];
  const paths = data["data"].map((page) => {
    return {
      params: { slug: page["attributes"].slug.toString() },
    };
  });
  console.log("paths", paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { slug, locale } = getLocalizedParams(context.query);
  const slug2 = context.params.slug;
  console.log("locale :", locale);
  const data = getData(slug2, locale);
  const res = await fetch(delve(data, "data"));
  const json = await res.json();
  const pageData = await getDataDependencies(json["data"][0]["attributes"]);
  return {
    props: { pageData },
  };
}

export default Universals;
