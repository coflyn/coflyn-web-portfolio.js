function updateTime() {
  const timeElement = document.getElementById("current-time");
  const now = new Date();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  timeElement.textContent = `${hours}:${minutes}:${seconds}`;
}

updateTime();
setInterval(updateTime, 1000);

document.addEventListener("DOMContentLoaded", () => {
  const marqueeLeft = document.querySelector(".marquee-left");
  const marqueeRight = document.querySelector(".marquee-right");
  const textContainer = document.querySelector(".w-full.space-y-4");

  let isSwapped = false;

  function swapMarquees() {
    isSwapped = !isSwapped;

    marqueeLeft.style.transition =
      "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
    marqueeRight.style.transition =
      "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";

    if (isSwapped) {
      const leftHeight = marqueeLeft.offsetHeight;
      const rightHeight = marqueeRight.offsetHeight;
      const gap = 16;

      marqueeLeft.style.transform = `translateY(${rightHeight + gap}px)`;
      marqueeRight.style.transform = `translateY(-${leftHeight + gap}px)`;
    } else {
      marqueeLeft.style.transform = "translateY(0)";
      marqueeRight.style.transform = "translateY(0)";
    }
  }

  [marqueeLeft, marqueeRight].forEach((marquee) => {
    marquee.style.cursor = "pointer";
    marquee.addEventListener("dblclick", swapMarquees);
  });
});
