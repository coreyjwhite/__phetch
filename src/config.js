/**
 * @module Config
 */

const Config = {
  apiHost: "http://192.168.13.224:5000/",
  logo: "/ETCH_logo.png",
  showBrand: false,
  navTree: [
    [
      "Home",
      "/icons/home.svg",
      [
        ["Home", "/"],
        ["Huddle", "/huddle"],
        ["Status Board", "/status"],
        ["Styles", "/styles"],
      ],
    ],
    [
      "Inventory",
      "/icons/box.svg",
      [
        ["Items", "/"],
        ["Omnis", "/"],
        ["Repackaging", "/inventory/repackaging"],
        ["Supplies", "/i"],
      ],
    ],

    [
      "Admin",
      "/icons/gear.svg",
      [
        ["Database", "/admin/database"],
        ["Locations", "/"],
      ],
    ],
  ],
};

export default Config;
