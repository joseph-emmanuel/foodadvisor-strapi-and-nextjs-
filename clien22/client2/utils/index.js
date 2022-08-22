// Get the url of the Strapi API based om the env variable or the default local one.
export function getStrapiURL(path) {
  return `${
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337/api"
  }${path}`;
}

// This function will get the url of your medias depending on where they are hosted
export function getStrapiMedia(url) {
  if (url == null) {
    return null;
  }
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }
  return `${
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337/api"
  }${url}`;
}

// handle the redirection to the homepage if the page we are browsinng doesn't exists
export function redirectToHomepage() {
  return {
    redirect: {
      destination: `/`,
      permanent: false,
    },
  };
}

// This function will build the url to fetch on the Strapi API
export function getData(slug, locale) {
  const slugToReturn = `/${slug}?lang=${locale}`;
  console.log("slug is : ", slug);
  const apiUrl = `/pages?populate=deep&filters[slug][$eq]=${slug}&_locale=${locale}`;
  console.log("slugToReturn :", slugToReturn);
  console.log("get strapi url :", getStrapiURL(apiUrl));
  return {
    data: getStrapiURL(apiUrl),
    slug: slugToReturn,
  };
}
// This function is for fetching the json
export async function fetchData(url) {
  const urldata = url;
  try {
    let res = await fetch(
      "http://localhost:1337/api/pages?populate=*&filters[slug][$eq]=pricing"
    );
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
