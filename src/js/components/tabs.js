const tabsBtn = document.querySelectorAll(".hero__sidebar-link");
const tabsItems = document.querySelectorAll(".hero__content");
tabsBtn.forEach(onTabClick);

function onTabClick(item) {
  item.addEventListener("click", function () {
    let currentBtn = item;
    let tabId = currentBtn.getAttribute("data-tab");
    let currentTab = document.querySelector(tabId);


    if (!currentBtn.classList.contains('hero__sidebar-link--active')) {
      tabsBtn.forEach(function (item) {
        item.classList.remove('hero__sidebar-link--active');
      });

      tabsItems.forEach(function (item) {
        item.classList.remove('hero__content--active');
      });

      currentBtn.classList.add('hero__sidebar-link--active');
      currentTab.classList.add('hero__content--active');
    }
  });
}
