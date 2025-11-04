const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item => {
    const li = item.parentElement;

    item.addEventListener('click', function () {
        allSideMenu.forEach(i => {
            i.parentElement.classList.remove('active');
        })
        li.classList.add('active');
    })
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
    sidebar.classList.toggle('hide');
})

const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
    if (window.innerWidth < 576) {
        e.preventDefault();
        searchForm.classList.toggle('show');
        if (searchForm.classList.contains('show')) {
            searchButtonIcon.classList.replace('bx-search', 'bx-x');
        } else {
            searchButtonIcon.classList.replace('bx-x', 'bx-search');
        }
    }
})

if (window.innerWidth < 768) {
    sidebar.classList.add('hide');
} else if (window.innerWidth > 576) {
    searchButtonIcon.classList.replace('bx-x', 'bx-search');
    searchForm.classList.remove('show');
}

window.addEventListener('resize', function () {
    if (this.innerWidth > 576) {
        searchButtonIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }
})

const body = document.body;
const switchMode = document.getElementById('switch-mode');

// 1️⃣ Start in dark mode by default
body.classList.add('dark');
switchMode.checked = true;

// 2️⃣ Toggle between dark and light
switchMode.addEventListener('change', () => {
    if (switchMode.checked) {
        body.classList.add('dark');   // Dark mode ON
    } else {
        body.classList.remove('dark'); // Light mode ON
    }
});

// Date MENU
function showDateMenu(x, y, dateText) {
  document.querySelectorAll(".date-menu").forEach(m => m.remove());

  const menu = document.createElement("div");
  menu.classList.add("date-menu");

  menu.style.left = `${x}px`;
  menu.style.top = `${y}px`;

  menu.innerHTML = `
    <ul>
      <li><i class='bx bxs-plane-alt'></i> Apply Leave</li>
      <li><i class='bx bxs-log-in-circle'></i> Punch In / Out</li>
      <li><i class='bx bxs-briefcase-alt-2'></i> Work Location</li>
      <li><i class='bx bxs-x-circle'></i> Cancel</li>
    </ul>
  `;

  document.body.appendChild(menu);
  console.log("✅ Date menu appended and styled:", dateText);

  // Close when clicking outside
  setTimeout(() => {
    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target)) menu.remove();
    }, { once: true });
  }, 10);
}

// calendr
document.addEventListener("DOMContentLoaded", () => {
    const calendar = document.getElementById("calendar");

    function generateCalendar(year, month) {
        calendar.innerHTML = "";

        const header = document.createElement("div");
        header.classList.add("calendar-header");

        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const title = document.createElement("h3");
        title.textContent = `${monthNames[month]} ${year}`;

        const prevBtn = document.createElement("button");
        prevBtn.textContent = "◀";
        const nextBtn = document.createElement("button");
        nextBtn.textContent = "▶";

        header.append(prevBtn, title, nextBtn);
        calendar.append(header);

        const daysGrid = document.createElement("div");
        daysGrid.classList.add("calendar");

        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        daysOfWeek.forEach(day => {
            const el = document.createElement("div");
            el.textContent = day;
            el.style.fontWeight = "bold";
            daysGrid.append(el);
        });

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDay = firstDay.getDay();
        const totalDays = lastDay.getDate();

        // Empty cells before the start day
        for (let i = 0; i < startDay; i++) {
            const empty = document.createElement("div");
            daysGrid.append(empty);
        }

        const today = new Date();
        const todayDate = today.getDate();
        const todayMonth = today.getMonth();
        const todayYear = today.getFullYear();

        // Limit: today + 7 days
        const limitDate = new Date(today);
        limitDate.setDate(today.getDate() + 7);

        for (let d = 1; d <= totalDays; d++) {
            const el = document.createElement("div");
            el.classList.add("calendar-day");
            el.textContent = d;

            const thisDate = new Date(year, month, d);

            // Highlight current date
            if (d === todayDate && month === todayMonth && year === todayYear) {
                el.classList.add("today");

                const dot = document.createElement("span");
                dot.classList.add("dot");
                dot.style.backgroundColor = "green"; // Always present on current date
                el.appendChild(dot);
            }

            // Past dates (with random dots)
            else if (thisDate < today) {
                const dot = document.createElement("span");
                dot.classList.add("dot");

                const rand = Math.floor(Math.random() * 3);
                if (rand === 0) dot.style.backgroundColor = "green"; // Present
                else if (rand === 1) dot.style.backgroundColor = "red"; // Absent
                else dot.style.backgroundColor = "yellow"; // Holiday/Leave

                el.appendChild(dot);
            }

            // Future 7 days (visible, no dots, not clickable)
            else if (thisDate > today && thisDate <= limitDate) {
                el.classList.add("next-week");
                el.style.pointerEvents = "none";
            }

            // After 7 days (disabled)
            else if (thisDate > limitDate) {
                el.classList.add("disabled");
                el.style.opacity = "0.4";
                el.style.pointerEvents = "none";
            }

            daysGrid.append(el);
            el.addEventListener("click", (e) => {
                const rect = e.target.getBoundingClientRect();
                const x = rect.left + window.scrollX + rect.width / 2;
                const y = rect.top + window.scrollY + rect.height + 8;
                const dateText = `${d} ${monthNames[month]} ${year}`;

                showDateMenu(x, y, dateText);
            });
        }

        calendar.append(daysGrid);

        // Month navigation
        prevBtn.addEventListener("click", () => {
            const newMonth = month === 0 ? 11 : month - 1;
            const newYear = month === 0 ? year - 1 : year;
            generateCalendar(newYear, newMonth);
        });

        nextBtn.addEventListener("click", () => {
            const newMonth = month === 11 ? 0 : month + 1;
            const newYear = month === 11 ? year + 1 : year;
            generateCalendar(newYear, newMonth);
        });
    }

    const now = new Date();
    generateCalendar(now.getFullYear(), now.getMonth());

});

document.addEventListener("DOMContentLoaded", () => {
    // === CONFIGURATION ===
    const isTesting = true; // 🧪 change to false for real mode
    const timeScale = isTesting ? 1000 * 10 : 1000 * 60 * 60; // 1 hour = 10 sec (testing)
    const requiredHours = 12;
    const punchOutDelay = requiredHours * timeScale;

    // === ELEMENTS ===
    const punchInBtn = document.getElementById("punchInBtn");
    const punchOutBtn = document.getElementById("punchOutBtn");
    const punchInTimeEl = document.getElementById("punchInTime");
    const punchOutTimeEl = document.getElementById("punchOutTime");
    const locationInfoEl = document.getElementById("locationInfo");

    let punchInTime = null;

    // === MODAL FUNCTION ===
    function showModal(message, onConfirm) {
        document.querySelectorAll(".modal-overlay").forEach((m) => m.remove());

        const overlay = document.createElement("div");
        overlay.className = "modal-overlay";
        overlay.innerHTML = `
      <div class="modal">
        <p>${message}</p>
        <div class="modal-buttons">
          <button id="confirmYes"><i class='bx bx-check-circle'></i> Yes</button>
          <button id="confirmNo"><i class='bx bx-x-circle'></i> No</button>
        </div>
      </div>
    `;
        document.body.appendChild(overlay);

        overlay.querySelector("#confirmYes").onclick = () => {
            onConfirm(true);
            overlay.remove();
        };
        overlay.querySelector("#confirmNo").onclick = () => overlay.remove();
    }

    // === REAL LOCATION FUNCTION ===
    function getLocation(callback) {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
            callback("Location unavailable");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                try {
                    // Use reverse geocoding API to get readable address
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
                    );
                    const data = await response.json();
                    const address = data.display_name || `Lat: ${latitude}, Lon: ${longitude}`;
                    callback(address);
                } catch (error) {
                    console.error("Location lookup failed:", error);
                    callback(`Lat: ${latitude}, Lon: ${longitude}`);
                }
            },
            (error) => {
                console.warn("Geolocation error:", error.message);
                callback("Location access denied or unavailable");
            }
        );
    }

    // === PUNCH IN ===
    punchInBtn.addEventListener("click", () => {
        getLocation((address) => {
            showModal(
                `Your current location:<br><small>${address}</small><br><br>Confirm punch in?`,
                (confirm) => {
                    if (confirm) {
                        punchInTime = new Date();
                        const formattedTime = punchInTime.toLocaleTimeString();
                        punchInTimeEl.textContent = `Punch In Time: ${formattedTime}`;
                        locationInfoEl.innerHTML = `<strong>In Location:</strong><br>${address}`;
                        punchInBtn.disabled = true;
                        punchOutBtn.disabled = true;

                        // Enable punch out after scaled time
                        setTimeout(() => {
                            punchOutBtn.disabled = false;
                            console.log("✅ Punch-out enabled after test duration");
                        }, punchOutDelay);
                    }
                }
            );
        });
    });

    // === PUNCH OUT ===
    punchOutBtn.addEventListener("click", () => {
        if (!punchInTime) {
            alert("Please punch in first!");
            return;
        }

        const now = new Date();
        const hoursWorked = (now - punchInTime) / timeScale; // scaled

        if (hoursWorked < requiredHours) {
            alert(
                `You can punch out only after ${requiredHours} hours.\nRemaining: ${(requiredHours - hoursWorked).toFixed(
                    1
                )} hrs`
            );
            return;
        }

        getLocation((address) => {
            showModal(
                `Your current location:<br><small>${address}</small><br><br>Confirm punch out?`,
                (confirm) => {
                    if (confirm) {
                        const formattedTime = now.toLocaleTimeString();
                        punchOutTimeEl.textContent = `Punch Out Time: ${formattedTime}`;
                        locationInfoEl.innerHTML += `<br><strong>Out Location:</strong><br>${address}`;
                        punchOutBtn.disabled = true;
                    }
                }
            );
        });
    });
});

// datetime.js

function updateDateTime() {
    const now = new Date();

    // Format time (HH:MM:SS)
    const time = now.toLocaleTimeString();

    // Format date (Tuesday, 4 November 2025)
    const date = now.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    document.getElementById("currentTime").textContent = time;
    document.getElementById("currentDate").textContent = date;
}

document.addEventListener("DOMContentLoaded", () => {
    updateDateTime();
    setInterval(updateDateTime, 1000);
});


