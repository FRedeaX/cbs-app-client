const url = `/wp-json/wp/v2`;
export const urlMap =
  "https://api-maps.yandex.ru/2.1/?apikey=76dd679b-d43f-4800-b744-f749eb0b34aa&lang=ru_RU";
// `/wp-json/wp/v2/posts/?page=${page}&_embed=wp:term,wp:featuredmedia`;

// const defaultFields = ["id", "slug", "template", "title", "content", "excerpt"];

export function urlFetchArticles(type, page = 1, embed) {
  let endUrl = [];
  endUrl.push(`${url}/${type}/?page=${page}`);
  if (embed) endUrl.push(`&_embed=${embed.join(",")}`);
  return endUrl.join("");
}

export function urlFetchArticle(type, slug, embed) {
  return embed
    ? `${url}/${type}/?slug=${slug}&_embed=${embed.join(",")}`
    : `${url}/${type}/?slug=${slug}&_fields=slug,title,excerpt,content,template`;
}

export function urlFetchArticleByCategory(type, id, embed) {
  return `${url}/${type}/?categories=${id}&_embed=${embed.join(",")}`;
}
