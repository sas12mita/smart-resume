import bcrypt from "bcryptjs";
import db from "./db.js";

const seedAdminUser = async () => {
    try {

        /* ---------- ADMIN ---------- */
        const [adminRows] = await db.query(
            "SELECT email FROM admins LIMIT 1"
        );

        let adminEmail = "admin@example.com";
        let adminPassword = "admin123";

        if (adminRows.length === 0) {
            const hashedPassword = await bcrypt.hash(adminPassword, 10);

            await db.query(
                "INSERT INTO admins (email, password) VALUE (?, ?)",
                [adminEmail, hashedPassword]
            );

            console.log(`👑 ADMIN LOGIN
                Email    : ${adminEmail}
                Password : ${adminPassword}\n`);

            console.log("✅ Admin created");
        } else {
            adminEmail = adminRows[0].email;

        }


        /* ---------- USER ---------- */
        const [userRows] = await db.query(
            "SELECT email FROM users LIMIT 1"
        );

        let userEmail = "user@example.com";
        let userPassword = "user123";

        if (userRows.length ===0) {
            const hashedPassword = await bcrypt.hash(userPassword, 10);

            await db.query(
                "INSERT INTO users (fullname,email, password) VALUES (?,?, ?)",
                ["first user", userEmail, hashedPassword]
            );

             console.log(`👤 USER LOGIN
            Email    : ${userEmail}
            Password : ${userPassword}`);
            console.log("✅ User created");
        } else {
            userEmail = userRows[0].email;

        }

        console.log("\n------------------------\n");

    } catch (error) {
        console.error("❌ Seeder something wrong:", error.message);
    }
};

export default seedAdminUser;
