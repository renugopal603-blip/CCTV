const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

    try {
        await page.goto('http://127.0.0.1:3000/admin-login', { waitUntil: 'networkidle0' });

        // Attempt to login if needed, though we can just force the local storage or just try to visit the route
        await page.evaluate(() => {
            localStorage.setItem('sv_user', JSON.stringify({ role: 'admin', name: 'Admin', email: 'admin@test.com' }));
        });

        // Now navigate to attendance directly
        await page.goto('http://127.0.0.1:3000/admin/attendance', { waitUntil: 'networkidle0' });
        console.log("Navigated to Admin Attendance");
        await page.waitForTimeout(2000); // wait for render

        const h1 = await page.$eval('h1', el => el.innerText).catch(() => 'no h1');
        console.log("Admin H1:", h1);

        // Also let's try employee dashboard
        await page.evaluate(() => {
            localStorage.setItem('sv_user', JSON.stringify({ role: 'employee', name: 'Emp', email: 'emp@test.com', id: 'EMP-01' }));
        });
        await page.goto('http://127.0.0.1:3000/employee-dashboard', { waitUntil: 'networkidle0' });
        console.log("Navigated to Employee Dashboard");
        await page.waitForTimeout(2000);

        // Click Attendance tab
        await page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            const attendanceBtn = buttons.find(b => b.innerText.includes('Attendance'));
            if (attendanceBtn) {
                attendanceBtn.click();
                console.log("Clicked Attendance tab on Employee Dashboard");
            } else {
                console.log("Attendance tab not found");
            }
        });
        await page.waitForTimeout(2000);

    } catch (err) {
        console.error('SCRIPT ERROR:', err);
    } finally {
        await browser.close();
    }
})();
