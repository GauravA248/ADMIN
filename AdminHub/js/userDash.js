
/*************** Theme & Sidebar Persist ****************/
const body = document.body;
const themeBtn = document.getElementById('themeBtn');
const themeIcon = document.getElementById('themeIcon');
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarToggleTop = document.getElementById('sidebarToggleTop');

// init from localStorage
const savedTheme = localStorage.getItem('jj_theme') || 'light';
if (savedTheme === 'dark') body.classList.add('dark');
updateThemeIcon();

function updateThemeIcon() {
    if (body.classList.contains('dark')) {
        themeIcon.className = 'bi bi-sun-fill';
    } else {
        themeIcon.className = 'bi bi-moon-fill';
    }
}

themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem('jj_theme', body.classList.contains('dark') ? 'dark' : 'light');
    updateThemeIcon();
});

// sidebar toggle
function toggleSidebar() {
    sidebar.classList.toggle('hide');
    // store state
    localStorage.setItem('jj_sidebar', sidebar.classList.contains('hide') ? 'hide' : 'show');
}
sidebarToggle.addEventListener('click', toggleSidebar);
sidebarToggleTop.addEventListener('click', toggleSidebar);

// load sidebar state
const savedSidebar = localStorage.getItem('jj_sidebar');
if (savedSidebar === 'hide') sidebar.classList.add('hide');

/************** Local Date **************/
const todayDate = document.getElementById('todayDate');
const d = new Date();
todayDate.textContent = d.toLocaleString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
});

/************** Calendar Setup **************/
const calendarGrid = document.getElementById('calendarGrid');
const monthLabel = document.getElementById('monthLabel');

let calDate = new Date();
calDate.setDate(1);

const attendanceData = {
    '2025-10-01': 'present',
    '2025-10-02': 'present',
    '2025-10-14': 'leave',
    '2025-10-27': 'holiday',
    '2025-10-30': 'present'
};

function renderCalendar() {
    calendarGrid.innerHTML = '';

    const year = calDate.getFullYear();
    const month = calDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // ✅ Update month name in top-right navigation section
    if (monthLabel) {
        monthLabel.textContent = calDate.toLocaleString(undefined, {
            month: 'long',
            year: 'numeric'
        });
    }

    // Empty cells before 1st day
    for (let i = 0; i < firstDay; i++) {
        const blank = document.createElement('div');
        blank.className = 'cal-day';
        calendarGrid.appendChild(blank);
    }

    // Day generation
    for (let day = 1; day <= daysInMonth; day++) {
        const cell = document.createElement('div');
        cell.className = 'cal-day';
        const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        const dateEl = document.createElement('div');
        dateEl.className = 'date';
        dateEl.textContent = day;
        cell.appendChild(dateEl);

        const stat = document.createElement('div');
        stat.style.fontSize = '11px';
        stat.style.marginTop = '6px';
        stat.style.fontWeight = '600';

        // ✅ Attendance logic
        const now = new Date();
        const isToday =
            day === now.getDate() &&
            month === now.getMonth() &&
            year === now.getFullYear();

        // ✅ If current date (today) and no attendance data, default to "Present"
        if (attendanceData[iso] === 'present' || (isToday && !attendanceData[iso])) {
            stat.textContent = 'Present';
            stat.style.color = 'var(--accent)';
        } else if (attendanceData[iso] === 'absent') {
            stat.textContent = 'Absent';
            stat.style.color = 'var(--red)';
        } else if (attendanceData[iso] === 'leave') {
            stat.textContent = 'Leave';
            stat.style.color = 'var(--yellow)';
        } else if (attendanceData[iso] === 'holiday') {
            stat.textContent = 'Holiday';
            stat.style.color = 'var(--orange)';
        } else {
            stat.textContent = '';
        }

        cell.appendChild(stat);

        // ✅ Highlight current date visually
        if (isToday) {
            cell.classList.add('today');
        }

        calendarGrid.appendChild(cell);
    }
}

// Navigation buttons
document.getElementById('prevMonth').addEventListener('click', () => {
    calDate.setMonth(calDate.getMonth() - 1);
    renderCalendar();
});

document.getElementById('nextMonth').addEventListener('click', () => {
    calDate.setMonth(calDate.getMonth() + 1);
    renderCalendar();
});

// Initial render
renderCalendar();

/*********** Punch in/out demo behavior ***********/
const punchIn = document.getElementById('punchIn');
const punchOut = document.getElementById('punchOut');
const lastPunch = document.getElementById('lastPunch');

function timeNow() {
    return new Date().toLocaleString();
}

punchIn.addEventListener('click', () => {
    lastPunch.textContent = 'Punched In at ' + timeNow();
    lastPunch.style.color = 'var(--accent)';
    // demo: mark today's date as present
    const now = new Date();
    const iso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    attendanceData[iso] = 'present';
    renderCalendar();
});

punchOut.addEventListener('click', () => {
    lastPunch.textContent = 'Punched Out at ' + timeNow();
    lastPunch.style.color = 'var(--muted)';
});

// quickPunch in topbar
document.getElementById('quickPunch').addEventListener('click', () => {
    punchIn.click();
    // small animation
    document.getElementById('quickPunch').textContent = '✔ Punched';
    setTimeout(() => document.getElementById('quickPunch').textContent = '⏱️ Punch', 1500);
});

/*********** Search filter (demo nav items) ***********/
const searchBox = document.getElementById('searchBox');
searchBox.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll('.nav-item').forEach(item => {
        const text = (item.innerText || '').toLowerCase();
        item.style.display = text.includes(q) ? 'flex' : 'none';
    });
});

/*********** small accessibility / keyboard toggles ***********/
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') { // ctrl/cmd + b toggles sidebar
        toggleSidebar();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') { // ctrl/cmd + d toggles theme
        themeBtn.click();
    }
});
