/* =========================
   Scroll Reveal
========================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});


/* =========================
   Hero
========================= */

const heroContent = document.querySelector(".hero-content");

if (heroContent) {
  window.addEventListener("scroll", () => {
    const scrollAmount = window.scrollY;
    const fadeAmount = Math.max(
      0,
      1 - scrollAmount / 500
    );

    heroContent.style.opacity = fadeAmount;

    heroContent.style.transform =
      `translateY(${scrollAmount * 0.12}px)`;
  });
}


/* =========================
   Our Memories Modal
========================= */

const memoryImages = [
  {
    src: "./images/memory01.jpg",
    alt: "ご当地マンホールと撮影した二人"
  },
  {
    src: "./images/memory02.jpg",
    alt: "人力車に乗って楽しむ二人"
  },
  {
    src: "./images/memory03.jpg",
    alt: "松島海岸駅で撮影した二人"
  },
  {
    src: "./images/memory04.jpg",
    alt: "自然な笑顔の二人の自撮り"
  },
  {
    src: "./images/memory05.jpg",
    alt: "桜と菜の花を背景にした二人"
  },
  {
    src: "./images/memory06.jpg",
    alt: "草津温泉で撮影した二人"
  },
  {
    src: "./images/memory07.jpg",
    alt: "本棚の前で手をつなぐ二人"
  },
  {
    src: "./images/memory08.jpg",
    alt: "おそろいのエプロンを着た二人"
  },
  {
    src: "./images/memory09.jpg",
    alt: "指輪を見せながら笑う二人"
  },
  {
  src: "./images/memory10.jpg",
  alt: "ライブ会場で撮影した二人"
},
{
  src: "./images/memory11.jpg",
  alt: "前撮りでお互いを指差して笑う二人"
},
{
  src: "./images/memory12.jpg",
  alt: "私服でお互いを指差して笑い合う二人"
},
{
  src: "./images/memory13.jpg",
  alt: "結婚指輪を手に持つ二人"
},
{
  src: "./images/memory14.jpg",
  alt: "陶芸体験で完成した作品と記念撮影する二人"
}
];

const memoryCards =
  document.querySelectorAll(".memory-card");

const memoryModal =
  document.getElementById("memory-modal");

const memoryModalImage =
  document.getElementById("memory-modal-image");

const memoryModalNumber =
  document.getElementById("memory-modal-number");

const memoryModalClose =
  document.getElementById("memory-modal-close");

const memoryModalPrev =
  document.getElementById("memory-modal-prev");

const memoryModalNext =
  document.getElementById("memory-modal-next");

let currentMemoryIndex = 0;
let touchStartX = 0;


function showMemoryImage(index) {
  if (
    !memoryModalImage ||
    !memoryModalNumber
  ) {
    return;
  }

  const totalImages = memoryImages.length;

  currentMemoryIndex =
    (index + totalImages) % totalImages;

  const currentImage =
    memoryImages[currentMemoryIndex];

  memoryModalImage.src =
    currentImage.src;

  memoryModalImage.alt =
    currentImage.alt;

  memoryModalNumber.textContent =
    `${String(currentMemoryIndex + 1).padStart(2, "0")} / ${String(totalImages).padStart(2, "0")}`;
}


function openMemoryModal(index) {
  if (!memoryModal) {
    return;
  }

  showMemoryImage(index);

  memoryModal.classList.add("is-open");

  memoryModal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add(
    "modal-open"
  );

  memoryModalClose?.focus();
}


function closeMemoryModal() {
  if (!memoryModal) {
    return;
  }

  memoryModal.classList.remove("is-open");

  memoryModal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "modal-open"
  );
}


memoryCards.forEach((card) => {
  card.addEventListener("click", () => {
    const selectedIndex =
      Number(card.dataset.index);

    openMemoryModal(selectedIndex);
  });
});


memoryModalClose?.addEventListener(
  "click",
  closeMemoryModal
);


memoryModalPrev?.addEventListener(
  "click",
  () => {
    showMemoryImage(currentMemoryIndex - 1);
  }
);


memoryModalNext?.addEventListener(
  "click",
  () => {
    showMemoryImage(currentMemoryIndex + 1);
  }
);


memoryModal?.addEventListener(
  "click",
  (event) => {
    if (event.target === memoryModal) {
      closeMemoryModal();
    }
  }
);


memoryModal?.addEventListener(
  "touchstart",
  (event) => {
    touchStartX =
      event.changedTouches[0].screenX;
  },
  {
    passive: true
  }
);


memoryModal?.addEventListener(
  "touchend",
  (event) => {
    const touchEndX =
      event.changedTouches[0].screenX;

    const swipeDistance =
      touchEndX - touchStartX;

    if (Math.abs(swipeDistance) < 50) {
      return;
    }

    if (swipeDistance > 0) {
      showMemoryImage(
        currentMemoryIndex - 1
      );
    } else {
      showMemoryImage(
        currentMemoryIndex + 1
      );
    }
  },
  {
    passive: true
  }
);


/* =========================
   Hidden Photo
========================= */

const hiddenHeart =
  document.getElementById("hidden-heart");

const hiddenModal =
  document.getElementById("hidden-modal");

const hiddenClose =
  document.getElementById("hidden-close");

const hiddenEnding =
  document.getElementById("hidden-ending");

let hiddenEndingTimer;


hiddenHeart?.addEventListener(
  "click",
  () => {
    hiddenModal?.classList.add("show");

    hiddenEnding?.classList.remove("show");

    window.clearTimeout(
      hiddenEndingTimer
    );

    hiddenEndingTimer =
      window.setTimeout(() => {
        hiddenEnding?.classList.add("show");
      }, 2500);
  }
);


function closeHiddenModal() {
  hiddenModal?.classList.remove("show");

  hiddenEnding?.classList.remove("show");

  window.clearTimeout(
    hiddenEndingTimer
  );
}


hiddenClose?.addEventListener(
  "click",
  closeHiddenModal
);


hiddenModal?.addEventListener(
  "click",
  (event) => {
    if (event.target === hiddenModal) {
      closeHiddenModal();
    }
  }
);


/* =========================
   Seat Guide Data
========================= */


const tableDisplayNames = {
  A: "A",
  F: "B",
  K: "C",
  B: "D",
  G: "E",
  L: "F",
  C: "G",
  H: "H",
  M: "I",
  D: "J",
  N: "K",
  E: "L",
  O: "M"
};

document.querySelectorAll(".seat-table").forEach((button) => {
  const originalTable = button.dataset.table;

  button.textContent =
    tableDisplayNames[originalTable] || originalTable;
});

const seatTables = {
  A: {
    group: "新郎高校友人",
    guests: [
      { name: "菅野 陽平" },
      { name: "渡邉 純哉" },
      { name: "佐久間 芽衣" },
      { name: "原田 菜々子" },
      { name: "蒲原 一輝" }
    ]
  },

  B: {
    group: "新郎大学友人",
    guests: [
      { name: "高橋 拓実" },
      { name: "柴田 康平" },
      { name: "濱津 勇斗" },
      { name: "宮城 大樹" },
      { name: "佐分 恭俊" },
      { name: "川村 陸哉" },
      { name: "馬庭 拓斗" },
      { name: "小佐野 太誠" }
    ]
  },

  C: {
    group: "新郎高校友人",
    guests: [
      { name: "齋藤 樹" },
      { name: "太田 隆太郎" },
      { name: "丹治 麻菜" },
      { name: "山田 玄暉" },
      { name: "齋藤 七海" },
      { name: "田川 雄一" }
    ]
  },

  D: {
  group: "新郎親族",
  guests: [
    {
      role: "大伯母",
      name: "福田 千代子"
    },
    {
      role: "祖父",
      name: "岡田 正光"
    },
    {
      role: "伯母",
      name: "岡田 美保子"
    },
    {
      role: "大伯父",
      name: "岡田 正美"
    }
  ]
},

  E: {
  group: "新郎親族",
  layout: "family-e",
  guests: [
    {
      role: "伯母",
      name: "髙橋 美也子"
    },
    {
      role: "従甥",
      name: "髙橋 陽翔"
    },
    {
      role: "従姉",
      name: "髙橋 恵美"
    },
    {
      role: "母",
      name: "野地 涼子"
    },
    {
      role: "父",
      name: "野地 孝一"
    },
    {
      role: "弟",
      name: "野地 祥太"
    },
    {
      role: "従妹",
      name: "髙橋 香織"
    }
  ]
},

  F: {
    group: "職場",
    guests: [
      { name: "馬場 みずほ" },
      { name: "吉藤 未知" },
      { name: "吉藤 早稀" },
      { name: "塚本 萌香" },
      { name: "塚本 結陽" },
      { name: "塚本 拓弥" },
      { name: "濱岡 宥輔" },
      { name: "濱岡 志帆" }
    ]
  },

  G: {
    group: "新郎小・中学校友人",
    guests: [
      { name: "渡辺 綾夏" },
      { name: "大沼 倫" },
      { name: "中村 彩音" },
      { name: "阿部 貴広" },
      { name: "吉田 啓祐" },
      { name: "山岸 祐也" },
      { name: "野地 皓太" }
    ]
  },

  H: {
    group: "",
    layout: "mixed-h",
    guests: [
      {
        name: "芥田 千怜",
        side: "bride"
      },
      {
        name: "國嶋 紗也",
        side: "bride"
      },
      {
        name: "中村 隆太郎",
        side: "bride"
      },
      {
        name: "阿部 隼人",
        side: "groom"
      },
      {
        name: "菅野 絢斗",
        side: "groom"
      },
      {
        name: "寺田 晃希",
        side: "groom"
      },
      {
        name: "伊勢 大地",
        side: "groom"
      }
    ]
  },

  K: {
    group: "新婦高校友人",
    guests: [
      { name: "眞藤 早希" },
      { name: "髙岡 夏美" },
      { name: "伊藤 凜" },
      { name: "伊藤 絵理花" },
      { name: "斎藤 未来" },
      { name: "袴田 紗生" },
      { name: "町野 純菜" },
      { name: "蓑原 瞳" }
    ]
  },

  L: {
    group: "新婦大学友人",
    guests: [
      { name: "新立 夏威人" },
      { name: "新立 桃子" },
      { name: "本田 響子" },
      { name: "加藤 花菜" },
      { name: "蒔田 芽依" },
      { name: "秋田 汐里" },
      { name: "池田 夏恋" }
    ]
  },

  M: {
    group: "新婦大学友人",
    guests: [
      { name: "松元 綾加" },
      { name: "松元 雄飛" },
      { name: "東 伸樹" },
      { name: "宮崎 良一" },
      { name: "今津 夏希" },
      { name: "井上 廉太郎" },
      { name: "山本 宏也" },
      { name: "杉山 祐亮" },
      { name: "土屋 友佑" },
      { name: "水野 菜摘" }
    ]
  },

  N: {
  group: "新婦親族",
  layout: "family-n",
  guests: [
    {
      role: "従弟",
      name: "佐久間 元美"
    },
    {
      role: "叔父",
      name: "佐久間 賢"
    },
    {
      role: "叔母",
      name: "佐久間 美智子"
    },
    {
      role: "祖母",
      name: "坂本 みさこ"
    },
    {
      role: "祖父",
      name: "坂本 武雄"
    },
    {
      role: "親戚",
      name: "佐久間 亮"
    },
    {
      role: "親戚",
      name: "佐久間 せいこ"
    },
    {
      role: "従弟",
      name: "佐久間 元春"
    }
  ]
},

  O: {
  group: "新婦親族",
  layout: "family-o",
  guests: [
    {
      role: "伯父",
      name: "栗木 誠"
    },
    {
      role: "伯母",
      name: "栗木 小百合"
    },
    {
      role: "妹",
      name: "宮地 杏果"
    },
    {
      role: "父",
      name: "宮地 和彦"
    },
    {
      role: "母",
      name: "宮地 多美恵"
    },
    {
      role: "叔母",
      name: "宮地 知枝"
    },
    {
      role: "叔父",
      name: "宮地 武士"
    }
  ]
},
};


/* =========================
   Seat Guide Elements
========================= */

const seatButtons =
  document.querySelectorAll(".seat-table");

const seatModal =
  document.getElementById("seat-modal");

const seatModalClose =
  document.getElementById(
    "seat-modal-close"
  );

const seatModalLetter =
  document.getElementById(
    "seat-modal-letter"
  );

const seatModalGroup =
  document.getElementById(
    "seat-modal-group"
  );

const roundSeating =
  document.getElementById(
    "round-seating"
  );


/* =========================
   通常テーブルの均等配置
   1人目は右上から開始
========================= */

function getEvenSeatCoordinates(
  index,
  total
) {
  const startAngle = -60;

  const angleStep =
    360 / total;

  const angle =
    startAngle + angleStep * index;

  const radians =
    angle * Math.PI / 180;

  let radiusX = 39;
  let radiusY = 39;

  if (total <= 4) {
    radiusX = 36;
    radiusY = 36;
  }

  if (total >= 9) {
    radiusX = 42;
    radiusY = 41;
  }

  return {
    left:
      50 + Math.cos(radians) * radiusX,

    top:
      50 + Math.sin(radians) * radiusY
  };
}


/* =========================
   特別なテーブル配置
========================= */

const specialSeatLayouts = {
  /*
    Eテーブル

             伯母

    従妹             従甥

    弟               従姉

       父          母
  */

  "family-e": [
    {
      left: 50,
      top: 8
    },
    {
      left: 83,
      top: 26
    },
    {
      left: 86,
      top: 56
    },
    {
      left: 68,
      top: 89
    },
    {
      left: 32,
      top: 89
    },
    {
      left: 14,
      top: 56
    },
    {
      left: 17,
      top: 26
    }
  ],


  /*
    Hテーブル

    新郎側（左）
    下から阿部→菅野→寺田→伊勢

    新婦側（右）
    上から芥田→國嶋→中村
  */

  "mixed-h": [
    {
      left: 82,
      top: 18
    },
    {
      left: 88,
      top: 47
    },
    {
      left: 78,
      top: 76
    },
    {
      left: 35,
      top: 89
    },
    {
      left: 14,
      top: 67
    },
    {
      left: 12,
      top: 39
    },
    {
      left: 25,
      top: 14
    }
  ],


  /*
    Nテーブル

    ⑧　　　　　①
    ⑦　　　　　②
    ⑥　　　　　③
    ⑤　　　　　④
  */

  "family-n": [
    {
      left: 76,
      top: 15
    },
    {
      left: 81,
      top: 38
    },
    {
      left: 81,
      top: 62
    },
    {
      left: 76,
      top: 85
    },
    {
      left: 24,
      top: 85
    },
    {
      left: 19,
      top: 62
    },
    {
      left: 19,
      top: 38
    },
    {
      left: 24,
      top: 15
    }
  ],


  /*
    Oテーブル

    叔父             伯父

    叔母             伯母

    妹

       母          父
  */

  "family-o": [
    {
      left: 80,
      top: 15
    },
    {
      left: 87,
      top: 42
    },
    {
      left: 22,
      top: 70
    },
    {
      left: 68,
      top: 90
    },
    {
      left: 32,
      top: 90
    },
    {
      left: 13,
      top: 42
    },
    {
      left: 20,
      top: 15
    }
  ]
};


/* =========================
   座席要素を作る
========================= */

function createSeatPerson(
  guest,
  coordinates
) {
  const person =
    document.createElement("div");

  person.className =
    "seat-person";

  person.style.left =
    `${coordinates.left}%`;

  person.style.top =
    `${coordinates.top}%`;


  if (guest.role) {
    const role =
      document.createElement("span");

    role.className =
      "seat-person-role";

    role.textContent =
      guest.role;

    person.appendChild(role);
  }


  const name =
    document.createElement("span");

  name.className =
    "seat-person-name";

  name.textContent =
    guest.name;

  person.appendChild(name);

  return person;
}


/* =========================
   Hテーブルの左右表示
========================= */

function addMixedSideLabels() {
  const groomLabel =
    document.createElement("span");

  groomLabel.className =
    "seat-side-label seat-side-groom";

  groomLabel.textContent =
    "Groom";


  const brideLabel =
    document.createElement("span");

  brideLabel.className =
    "seat-side-label seat-side-bride";

  brideLabel.textContent =
    "Bride";


  roundSeating.appendChild(
    groomLabel
  );

  roundSeating.appendChild(
    brideLabel
  );
}


/* =========================
   Seat Modalを開く
========================= */

function openSeatModal(tableLetter) {
  const tableData =
    seatTables[tableLetter];

  if (
    !tableData ||
    !seatModal ||
    !roundSeating
  ) {
    return;
  }


 seatModalLetter.textContent =
  tableDisplayNames[tableLetter] || tableLetter;

  seatModalGroup.textContent =
    tableData.group;


  roundSeating.innerHTML =
    '<div class="round-table-center"></div>';


  if (
    tableData.layout === "mixed-h"
  ) {
    addMixedSideLabels();
  }


  tableData.guests.forEach(
    (guest, index) => {
      let coordinates;


      if (
        tableData.layout &&
        specialSeatLayouts[
          tableData.layout
        ]
      ) {
        coordinates =
          specialSeatLayouts[
            tableData.layout
          ][index];
      } else {
        coordinates =
          getEvenSeatCoordinates(
            index,
            tableData.guests.length
          );
      }


      const person =
        createSeatPerson(
          guest,
          coordinates
        );


      roundSeating.appendChild(
        person
      );
    }
  );


  seatModal.classList.add(
    "is-open"
  );

  seatModal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add(
    "seat-modal-open"
  );

  seatModalClose?.focus();
}


/* =========================
   Seat Modalを閉じる
========================= */

function closeSeatModal() {
  if (!seatModal) {
    return;
  }

  seatModal.classList.remove(
    "is-open"
  );

  seatModal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "seat-modal-open"
  );
}


seatButtons.forEach((button) => {
  button.addEventListener(
    "click",
    () => {
      openSeatModal(
        button.dataset.table
      );
    }
  );
});


seatModalClose?.addEventListener(
  "click",
  closeSeatModal
);


seatModal?.addEventListener(
  "click",
  (event) => {
    if (event.target === seatModal) {
      closeSeatModal();
    }
  }
);


/* =========================
   共通キーボード操作
========================= */

document.addEventListener(
  "keydown",
  (event) => {
    if (
      event.key === "Escape"
    ) {
      if (
        memoryModal?.classList.contains(
          "is-open"
        )
      ) {
        closeMemoryModal();
      }

      if (
        seatModal?.classList.contains(
          "is-open"
        )
      ) {
        closeSeatModal();
      }

      if (
        hiddenModal?.classList.contains(
          "show"
        )
      ) {
        closeHiddenModal();
      }
    }


    if (
      memoryModal?.classList.contains(
        "is-open"
      )
    ) {
      if (event.key === "ArrowLeft") {
        showMemoryImage(
          currentMemoryIndex - 1
        );
      }

      if (event.key === "ArrowRight") {
        showMemoryImage(
          currentMemoryIndex + 1
        );
      }
    }
  }
);
/* =========================
   View All Tables
========================= */

const allTablesButton =
  document.getElementById("all-tables-button");

const allTablesModal =
  document.getElementById("all-tables-modal");

const allTablesClose =
  document.getElementById("all-tables-close");

const allTablesGrid =
  document.getElementById("all-tables-grid");

const allTablesGuestOrder = {
  D: [
    "岡田 正光",
    "岡田 正美",
    "福田 千代子",
    "岡田 美保子"
  ],

  N: [
    "坂本 武雄",
    "坂本 みさこ",
    "佐久間 賢",
    "佐久間 美智子",
    "佐久間 元春",
    "佐久間 元美",
    "佐久間 亮",
    "佐久間 せいこ"
  ],

  E: [
    "野地 孝一",
    "野地 涼子",
    "野地 祥太",
    "髙橋 美也子",
    "髙橋 恵美",
    "髙橋 香織",
    "髙橋 陽翔"
  ],

  O: [
    "宮地 和彦",
    "宮地 多美恵",
    "宮地 杏果",
    "栗木 誠",
    "栗木 小百合",
    "宮地 武士",
    "宮地 知枝"
  ]
};
function createAllTables() {

  allTablesGrid.innerHTML = "";

 Object.entries(seatTables)
  .sort(([letterA], [letterB]) => {
    const displayA =
      tableDisplayNames[letterA] || letterA;

    const displayB =
      tableDisplayNames[letterB] || letterB;

    return displayA.localeCompare(displayB);
  })
  .forEach(([letter, table]) => {
    
    const card = document.createElement("div");
    card.className = "all-table-card";

    let html = `
     <h3>${tableDisplayNames[letter] || letter}</h3>
      <h4>${table.group}</h4>
      <ul>
    `;
const displayGuests =
  allTablesGuestOrder[letter]
    ? allTablesGuestOrder[letter]
        .map((name) =>
          table.guests.find(
            (guest) => guest.name === name
          )
        )
        .filter(Boolean)
    : table.guests;
   displayGuests.forEach((guest) => {

      html += `
        <li>
          ${guest.role ? `${guest.role}　` : ""}
          ${guest.name}
        </li>
      `;

    });

    html += `
      </ul>
    `;

    card.innerHTML = html;

    allTablesGrid.appendChild(card);

  });

}
function openAllTablesModal() {
  createAllTables();

  allTablesModal.classList.add("show");

  allTablesModal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add(
    "all-tables-open"
  );

  allTablesClose.focus();
}


function closeAllTablesModal() {
  allTablesModal.classList.remove("show");

  allTablesModal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "all-tables-open"
  );
}


allTablesButton.addEventListener(
  "click",
  openAllTablesModal
);


allTablesClose.addEventListener(
  "click",
  closeAllTablesModal
);


allTablesModal.addEventListener(
  "click",
  (event) => {
    if (event.target === allTablesModal) {
      closeAllTablesModal();
    }
  }
);


document.addEventListener(
  "keydown",
  (event) => {
    if (
      event.key === "Escape" &&
      allTablesModal.classList.contains("show")
    ) {
      closeAllTablesModal();
    }
  }
);
