// /app/api/userdetail/[userId]/route.js
import mysql from 'mysql2/promise';

export async function PUT(request, { params }) {
  const { userId } = params;
  const { username, usersurname, date_of_birth } = await request.json();

  // ตรวจสอบค่าของฟิลด์และแทนที่ค่าที่เป็น undefined ด้วย null
  const safeUsername = username !== undefined ? username : null;
  const safeUsersurname = usersurname !== undefined ? usersurname : null;
  const safeDateOfBirth = date_of_birth !== undefined ? date_of_birth : null;

  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    const updateQuery = `
      UPDATE user 
      SET user_name = ?, user_surname = ?, date_of_birth = ?
      WHERE user_id = ?;
    `;
    
    // เรียกใช้งานคำสั่ง SQL
    await connection.execute(updateQuery, [
      safeUsername, safeUsersurname, safeDateOfBirth, userId
    ]);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error('Error updating data:', err);
    return new Response(JSON.stringify({ error: 'Failed to update user' }), { status: 500 });
  }
}
