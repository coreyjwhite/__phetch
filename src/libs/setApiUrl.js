import config from "config";

export default function setApiUrl(slug) {
  return `${config.apiHost}${slug}`;
}
