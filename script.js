// Data Models
const ORGS = {
  ALL: { name: 'All Organizations', bg: '#0b2545', color: '#ffffff' },
  SSC: { name: 'Supreme Student Council', bg: '#1d4ed8', color: '#ffffff', icon: 'fa-user-graduate' },
  ICT: { name: 'ICT Club', bg: '#0284c7', color: '#ffffff', icon: 'fa-laptop-code' },
  RCY: { name: 'Red Cross Youth', bg: '#dc2626', color: '#ffffff', icon: 'fa-heart-pulse' },
  SPORTS: { name: 'Sports Development', bg: '#d97706', color: '#ffffff', icon: 'fa-trophy' },
  NSTP: { name: 'NSTP Office', bg: '#16a34a', color: '#ffffff', icon: 'fa-tree' },
  ALUMNI: { name: 'Alumni Association', bg: '#7c3aed', color: '#ffffff', icon: 'fa-award' }
};

let eventsData = [
  { id: 1, title: 'NSTP Seminar', date: '2025-04-01', time: '8:00 AM - 11:30 AM', venue: 'AU-JRC Audio Visual Room', org: 'NSTP', desc: 'Civic welfare and community safety workshop.' },
  { id: 2, title: 'Intramurals 2025 Opening', date: '2025-04-03', time: '8:00 AM - 4:00 PM', venue: 'AU-JRC Quadrangle', org: 'SPORTS', desc: 'Annual sports festival opening ceremony.' },
  { id: 3, title: 'Career Fair & Workshop', date: '2025-04-07', time: '9:00 AM - 3:00 PM', venue: 'AU-JRC Gymnasium', org: 'ICT', desc: 'Tech career fair and mock interviews.' },
  { id: 4, title: 'Academic Forum', date: '2025-04-10', time: '9:00 AM - 12:00 PM', venue: 'AU-JRC Auditorium', org: 'SSC', desc: 'A forum featuring industry experts discussing career paths.' },
  { id: 5, title: 'Blood Drive 2025', date: '2025-04-15', time: '8:00 AM - 2:00 PM', venue: 'AU-JRC Clinic', org: 'RCY', desc: 'Annual voluntary blood donation drive.' },
  { id: 6, title: 'Organization Fair', date: '2025-04-21', time: '9:00 AM - 4:00 PM', venue: 'AU-JRC Grounds', org: 'SSC', desc: 'Student organization recruitment showcase.' },
  { id: 7, title: 'Araw ng AU Celebration', date: '2025-04-24', time: '8:00 AM - 5:00 PM', venue: 'AU-JRC Grounds', org: 'ALUMNI', desc: 'University foundation day celebration.' },
  { id: 8, title: 'Sports Fest Finals', date: '2025-04-28', time: '7:00 AM - 5:00 PM', venue: 'AU-JRC Gymnasium', org: 'SPORTS', desc: 'Championship games for basketball and volleyball.' }
];

let announcementsData = [
  { id: 1, title: 'Schedule Adjustment for Intramurals', date: '2025-04-02', badge: 'Important', content: 'Classes will be suspended on April 3 for the Intramurals Opening Ceremony.' },
  { id: 2, title: 'Venue Change: Academic Forum', date: '2025-04-08', badge: 'Notice', content: 'The Academic Forum has been moved from AVR to the Main Auditorium.' }
];

let currentYear = 2025;
let currentMonth = 3; // April (0-indexed)
let activeOrgFilter = 'ALL';
let currentViewMode = 'month';
let isAdminLoggedIn = false;

// Initialize Web App
document.addEventListener('DOMContentLoaded', () => {
  renderOrgFilterChips();
  renderCalendar();
  renderUpcomingEvents();
  renderEventsDirectory();
  renderAnnouncements();
});

// Tab Navigation
function switchTab(tabId, event) {
  if (event) event.preventDefault();
  
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));

  const targetTab = document.getElementById(`tab-${tabId}`);
  if (targetTab) targetTab.classList.add('active');

  const activeNav = Array.from(document.querySelectorAll('.nav-item')).find(el => el.textContent.toLowerCase() === tabId);
  if (activeNav) activeNav.classList.add('active');
}

// Render Org Filter Chips
function renderOrgFilterChips() {
  const container = document.getElementById('orgFilterChips');
  container.innerHTML = '';

  Object.keys(ORGS).forEach(key => {
    const org = ORGS[key];
    const chip = document.createElement('div');
    chip.className = `chip ${activeOrgFilter === key ? 'active' : ''}`;
    chip.innerHTML = `${org.icon ? `<i class="fa-solid ${org.icon}"></i>` : ''} ${org.name}`;
    chip.onclick = () => {
      activeOrgFilter = key;
      renderOrgFilterChips();
      renderCalendar();
      renderUpcomingEvents();
      renderEventsDirectory();
    };
    container.appendChild(chip);
  });
}

// Render Calendar Logic
function renderCalendar() {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  document.getElementById('calendarMonthYear').innerText = `${monthNames[currentMonth]} ${currentYear}`;

  if (currentViewMode === 'month') {
    renderMonthGrid();
  } else if (currentViewMode === 'week') {
    renderWeekGrid();
  } else {
    renderListGrid();
  }
}

function renderMonthGrid() {
  const container = document.getElementById('monthViewContainer');
  container.style.display = 'grid';
  document.getElementById('weekViewContainer').style.display = 'none';
  document.getElementById('listViewContainer').style.display = 'none';
  container.innerHTML = '';

  // Day Headers
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  days.forEach(day => {
    const div = document.createElement('div');
    div.className = 'day-header';
    div.innerText = day;
    container.appendChild(div);
  });

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
  const prevMonthTotalDays = new Date(currentYear, currentMonth, 0).getDate();

  // Previous Month Padding
  for (let i = firstDay - 1; i >= 0; i--) {
    const cell = createDayCell(prevMonthTotalDays - i, true);
    container.appendChild(cell);
  }

  // Current Month Days
  for (let day = 1; day <= totalDays; day++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const cell = createDayCell(day, false, dateStr);
    container.appendChild(cell);
  }

  // Next Month Padding
  const totalCells = firstDay + totalDays;
  const nextDays = (7 - (totalCells % 7)) % 7;
  for (let i = 1; i <= nextDays; i++) {
    const cell = createDayCell(i, true);
    container.appendChild(cell);
  }
}

function createDayCell(dayNum, isOtherMonth, dateStr = '') {
  const cell = document.createElement('div');
  cell.className = `calendar-day-cell ${isOtherMonth ? 'other-month' : ''}`;
  
  const numSpan = document.createElement('span');
  numSpan.className = 'day-number';
  numSpan.innerText = dayNum;
  cell.appendChild(numSpan);

  if (!isOtherMonth) {
    const dayEvents = eventsData.filter(ev => ev.date === dateStr && (activeOrgFilter === 'ALL' || ev.org === activeOrgFilter));
    dayEvents.forEach(ev => {
      const badge = document.createElement('div');
      badge.className = 'event-badge';
      const orgInfo = ORGS[ev.org] || { bg: '#0b2545', icon: 'fa-calendar' };
      badge.style.backgroundColor = `${orgInfo.bg}15`;
      badge.style.color = orgInfo.bg;
      badge.style.borderLeft = `3px solid ${orgInfo.bg}`;

      badge.innerHTML = `
        <span class="org-icon-badge" style="background:${orgInfo.bg}">
          <i class="fa-solid ${orgInfo.icon}"></i>
        </span>
        <span>${ev.title}</span>
      `;
      badge.onclick = (e) => {
        e.stopPropagation();
        openEventModal(ev);
      };
      cell.appendChild(badge);
    });
  }

  return cell;
}

function renderWeekGrid() {
  const container = document.getElementById('weekViewContainer');
  container.style.display = 'block';
  document.getElementById('monthViewContainer').style.display = 'none';
  document.getElementById('listViewContainer').style.display = 'none';

  const filtered = eventsData.filter(ev => activeOrgFilter === 'ALL' || ev.org === activeOrgFilter);
  container.innerHTML = `
    <div style="padding:20px; text-align:center;">
      <h3>Week View Perspective</h3>
      <p style="color: var(--text-muted); margin-top: 5px;">Displaying ${filtered.length} scheduled events for this timeframe.</p>
    </div>
  `;
}

function renderListGrid() {
  const container = document.getElementById('listViewContainer');
  container.style.display = 'block';
  document.getElementById('monthViewContainer').style.display = 'none';
  document.getElementById('weekViewContainer').style.display = 'none';

  const filtered = eventsData.filter(ev => activeOrgFilter === 'ALL' || ev.org === activeOrgFilter);
  container.innerHTML = filtered.map(ev => {
    const org = ORGS[ev.org];
    return `
      <div class="upcoming-item" style="margin-bottom: 10px;" onclick="openEventModalById(${ev.id})">
        <div class="upcoming-icon" style="background: ${org.bg}">
          <i class="fa-solid ${org.icon}"></i>
        </div>
        <div class="upcoming-details">
          <h4>${ev.title}</h4>
          <p><i class="fa-solid fa-calendar"></i> ${ev.date} | <i class="fa-solid fa-clock"></i> ${ev.time}</p>
          <p><i class="fa-solid fa-location-dot"></i> ${ev.venue}</p>
        </div>
      </div>
    `;
  }).join('');
}

// View Switcher Handlers
function changeView(mode) {
  currentViewMode = mode;
  document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(`btn-${mode}`).classList.add('active');
  renderCalendar();
}

function navigateMonth(direction) {
  currentMonth += direction;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
}

// Upcoming Events Sidebar
function renderUpcomingEvents() {
  const container = document.getElementById('upcomingEventsList');
  const filtered = eventsData.filter(ev => activeOrgFilter === 'ALL' || ev.org === activeOrgFilter).slice(0, 4);

  container.innerHTML = filtered.map(ev => {
    const org = ORGS[ev.org];
    return `
      <div class="upcoming-item" onclick="openEventModalById(${ev.id})">
        <div class="upcoming-icon" style="background: ${org.bg}">
          <i class="fa-solid ${org.icon}"></i>
        </div>
        <div class="upcoming-details">
          <h4>${ev.title}</h4>
          <p><i class="fa-solid fa-calendar"></i> ${ev.date}</p>
          <p><i class="fa-solid fa-clock"></i> ${ev.time}</p>
          <p><i class="fa-solid fa-location-dot"></i> ${ev.venue}</p>
        </div>
      </div>
    `;
  }).join('');
}

// Events Directory
function renderEventsDirectory() {
  const container = document.getElementById('eventsDirectoryGrid');
  const filtered = eventsData.filter(ev => activeOrgFilter === 'ALL' || ev.org === activeOrgFilter);

  container.innerHTML = filtered.map(ev => {
    const org = ORGS[ev.org];
    return `
      <div class="event-card-full">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 10px;">
            <span style="background:${org.bg}20; color:${org.bg}; font-size:0.75rem; font-weight:700; padding:4px 8px; border-radius:4px;">
              ${org.name}
            </span>
            ${isAdminLoggedIn ? `<button onclick="deleteEvent(${ev.id})" style="color:red; background:none; border:none; cursor:pointer;"><i class="fa-solid fa-trash"></i></button>` : ''}
          </div>
          <h3 style="color: var(--au-navy); font-size: 1.05rem; margin-bottom: 8px;">${ev.title}</h3>
          <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 4px;"><i class="fa-solid fa-calendar"></i> ${ev.date} (${ev.time})</p>
          <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 10px;"><i class="fa-solid fa-location-dot"></i> ${ev.venue}</p>
          <p style="font-size: 0.85rem; color: #4b5563;">${ev.desc}</p>
        </div>
        <button class="btn btn-outline" style="margin-top: 15px; width:100%;" onclick="openEventModalById(${ev.id})">View Details</button>
      </div>
    `;
  }).join('');
}

// Announcements View
function renderAnnouncements() {
  const container = document.getElementById('announcementsContainer');
  container.innerHTML = announcementsData.map(anc => `
    <div class="anc-card">
      <span class="anc-badge">${anc.badge}</span>
      <h3 style="color: var(--au-navy); font-size: 1.1rem; margin-bottom: 5px;">${anc.title}</h3>
      <p style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 10px;"><i class="fa-solid fa-clock"></i> Posted on ${anc.date}</p>
      <p style="color: #374151; font-size: 0.9rem;">${anc.content}</p>
    </div>
  `).join('');
}

// Search Handler
function handleSearch() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const filteredEvents = eventsData.filter(ev => 
    ev.title.toLowerCase().includes(query) || 
    ev.venue.toLowerCase().includes(query) ||
    ev.desc.toLowerCase().includes(query)
  );

  const container = document.getElementById('upcomingEventsList');
  container.innerHTML = filteredEvents.map(ev => {
    const org = ORGS[ev.org];
    return `
      <div class="upcoming-item" onclick="openEventModalById(${ev.id})">
        <div class="upcoming-icon" style="background: ${org.bg}">
          <i class="fa-solid ${org.icon}"></i>
        </div>
        <div class="upcoming-details">
          <h4>${ev.title}</h4>
          <p><i class="fa-solid fa-calendar"></i> ${ev.date}</p>
          <p><i class="fa-solid fa-location-dot"></i> ${ev.venue}</p>
        </div>
      </div>
    `;
  }).join('');
}

// Event Modal Logic
function openEventModal(ev) {
  const org = ORGS[ev.org] || { name: 'AU-JRC', bg: '#0b2545', icon: 'fa-users' };
  
  document.getElementById('mOrgBadge').style.backgroundColor = org.bg;
  document.getElementById('mOrgBadge').innerHTML = `<i class="fa-solid ${org.icon}"></i>`;
  document.getElementById('mTitle').innerText = ev.title;
  document.getElementById('mOrgName').innerText = org.name;
  document.getElementById('mDate').innerText = ev.date;
  document.getElementById('mTime').innerText = ev.time;
  document.getElementById('mVenue').innerText = ev.venue;
  document.getElementById('mDesc').innerText = ev.desc;

  document.getElementById('eventModal').classList.add('active');
}

function openEventModalById(id) {
  const ev = eventsData.find(e => e.id === id);
  if (ev) openEventModal(ev);
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
}

// Authentication & Admin Actions
function toggleLoginModal() {
  if (isAdminLoggedIn) {
    logoutAdmin();
  } else {
    document.getElementById('loginModal').classList.add('active');
  }
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const u = document.getElementById('loginUser').value;
  const p = document.getElementById('loginPass').value;

  if (u === 'admin' && p === 'au1938') {
    isAdminLoggedIn = true;
    document.getElementById('loginBtnText').innerText = 'Admin Active';
    document.getElementById('adminPanel').style.display = 'block';
    closeModal('loginModal');
    renderEventsDirectory();
    alert('Admin Mode Activated!');
  } else {
    alert('Invalid Credentials!');
  }
}

function logoutAdmin() {
  isAdminLoggedIn = false;
  document.getElementById('loginBtnText').innerText = 'Login';
  document.getElementById('adminPanel').style.display = 'none';
  renderEventsDirectory();
}

function handleCreateEvent(e) {
  e.preventDefault();
  const newEv = {
    id: Date.now(),
    title: document.getElementById('evTitle').value,
    date: document.getElementById('evDate').value,
    time: document.getElementById('evTime').value,
    venue: document.getElementById('evVenue').value,
    org: document.getElementById('evOrg').value,
    desc: document.getElementById('evDesc').value
  };

  eventsData.push(newEv);
  renderCalendar();
  renderUpcomingEvents();
  renderEventsDirectory();
  document.getElementById('createEventForm').reset();
  alert('Event successfully created!');
}

function handleCreateAnnouncement(e) {
  e.preventDefault();
  const newAnc = {
    id: Date.now(),
    title: document.getElementById('ancTitle').value,
    date: document.getElementById('ancDate').value,
    badge: document.getElementById('ancBadge').value,
    content: document.getElementById('ancContent').value
  };

  announcementsData.unshift(newAnc);
  renderAnnouncements();
  document.getElementById('createAnnouncementForm').reset();
  alert('Announcement posted!');
}

function deleteEvent(id) {
  if (confirm('Are you sure you want to delete this event?')) {
    eventsData = eventsData.filter(ev => ev.id !== id);
    renderCalendar();
    renderUpcomingEvents();
    renderEventsDirectory();
  }
}