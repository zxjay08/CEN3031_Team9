/*!

=========================================================
* Now UI Dashboard React - v1.5.2
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// ##############################
// // // tasks list for Tasks card in Dashboard view
// #############################

const tasks = [
  {
    checked: true,
    text: 'Sign contract for "What are conference organizers afraid of?"',
  },
  {
    checked: false,
    text: "Lines From Great Russian Literature? Or E-mails From My Boss?",
  },
  {
    checked: true,
    text: "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
  },
];

// ##############################
// // // table head data and table body data for Tables view
// #############################

const thead = ["Name", "Class", "Phone Number", "Email"];
const tbody = [
  {
    className: "table-success",
    data: ["Porter Johnson", "Math", "444-324-1949", "porter@school.edu"],
  },
  {
    className: "",
    data: ["Maria Rodriguez", "English", "739-373-1824", "maria@school.edu"],
  },
  {
    className: "table-info",
    data: ["Ana Suzuki", "Science", "111-328-4718", "ana@school.edu"],
  },
  {
    className: "",
    data: ["Mark Peterson", "History", "749-218-3217", "mark@school.edu"],
  },
  {
    className: "table-danger",
    data: ["Andrew Williams", "Civics", "423-124-1629", "andrew@school.edu"],
  },
  { className: "", data: ["Jason Torres", "Music", "739-328-1273", "jason@school.edu"] },
  {
    className: "table-warning",
    data: ["John Picard", "Astronomy", "934-123-4589", "john@school.edu"],
  },
];

// tasks list for Tasks card in Dashboard view
// data for <thead> of table in TableList view
// data for <tbody> of table in TableList view
export { tasks, thead, tbody };
