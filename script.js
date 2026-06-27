/* =========================================================
   STUDENT PORTAL — SCRIPT
   Handles mobile sidebar toggle + voting results bar chart.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ---- Mobile menu panel toggle ---- */
    const homeMenuBtn = document.getElementById('homeMenuBtn');
    const menuPanel = document.getElementById('menuPanel');
    const backdrop = document.getElementById('sidebarBackdrop');

    function openMenu() {
        menuPanel.classList.add('open');
        backdrop.classList.add('show');
        homeMenuBtn.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
        menuPanel.classList.remove('open');
        backdrop.classList.remove('show');
        homeMenuBtn.setAttribute('aria-expanded', 'false');
    }

    homeMenuBtn.addEventListener('click', () => {
        menuPanel.classList.contains('open') ? closeMenu() : openMenu();
    });

    backdrop.addEventListener('click', closeMenu);

    // Sidebar icon selection (home / screen / users)
    document.querySelectorAll('.sidebar-icon').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.sidebar-icon').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (btn !== homeMenuBtn) {
                closeMenu();
            }
        });
    });

    /* ---- Side menu active state + view switching ---- */
    const dashboardView = document.getElementById('dashboardView');
    const financialView = document.getElementById('financialView');
    const financialBackBtn = document.getElementById('financialBackBtn');
    const selectableMenuItems = document.querySelectorAll('.menu-item, .menu-subitem');

    function clearMenuSelection() {
        selectableMenuItems.forEach(item => {
            item.classList.remove('active');
            item.classList.remove('menu-item-active');
        });
    }

    function showDashboard() {
        dashboardView.classList.remove('hidden');
        financialView.classList.add('hidden');
    }

    function showFinancialRecord() {
        dashboardView.classList.add('hidden');
        financialView.classList.remove('hidden');
    }

    selectableMenuItems.forEach(item => {
        item.addEventListener('click', () => {
            clearMenuSelection();
            item.classList.add('active');

            const parentSublist = item.closest('.menu-sublist');
            if (parentSublist) {
                const parentItem = parentSublist.previousElementSibling;
                if (parentItem && parentItem.classList.contains('menu-item')) {
                    parentItem.classList.add('active');
                }
            }

            if (item.dataset.view === 'financial') {
                showFinancialRecord();
            } else {
                showDashboard();
            }
        });
    });

    if (financialBackBtn) {
        financialBackBtn.addEventListener('click', () => {
            clearMenuSelection();
            const homeItem = document.querySelector('.menu-list > .menu-item');
            if (homeItem) {
                homeItem.classList.add('active');
            }
            showDashboard();
        });
    }

    /* ---- Dropdown menu items: toggle open/closed ---- */
    document.querySelectorAll('[data-menu-toggle]').forEach(item => {
        item.addEventListener('click', () => {
            const sublist = item.nextElementSibling;
            item.classList.toggle('menu-open');
            if (sublist && sublist.classList.contains('menu-sublist')) {
                sublist.classList.toggle('menu-open');
            }
        });
    });

    /* ---- Voting results chart ---- */
    const ctx = document.getElementById('voteChart');
    if (ctx) {
        const styles = getComputedStyle(document.documentElement);
        const teal = styles.getPropertyValue('--color-chart-teal').trim();
        const yellow = styles.getPropertyValue('--color-chart-yellow').trim();
        const sand = styles.getPropertyValue('--color-chart-sand').trim();

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['ممتاز', 'جيد جدا', 'جيد'],
                datasets: [{
                    label: 'نتائج التصويت',
                    data: [45000, 17625, 21535],
                    backgroundColor: [teal, yellow, sand],
                    borderRadius: 4,
                    barPercentage: 0.55,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        rtl: true,
                        labels: {
                            font: { family: 'Tajawal' },
                            boxWidth: 14,
                        }
                    },
                    tooltip: {
                        rtl: true,
                        bodyFont: { family: 'Tajawal' },
                        titleFont: { family: 'Tajawal' }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { font: { family: 'Tajawal' } },
                        grid: { color: '#eef0f2' }
                    },
                    x: {
                        ticks: { font: { family: 'Tajawal' } },
                        grid: { display: false }
                    }
                }
            }
        });
    }

});
