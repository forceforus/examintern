// /app/api/userdetail/[userId]/route.js
import mysql from 'mysql2/promise';

// ฟังก์ชันลบผู้ใช้ตาม user_id
export async function DELETE(request, { params }) {
  const { userId } = params;

  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    // คำสั่ง SQL สำหรับลบผู้ใช้ที่ระบุ user_id
    const deleteQuery = 'DELETE FROM user WHERE user_id = ?';

    // ดำเนินการลบข้อมูล
    await connection.execute(deleteQuery, [userId]);

    // ปิดการเชื่อมต่อ
    await connection.end();

    return new Response(JSON.stringify({ success: true, message: `User with ID ${userId} deleted successfully` }), { status: 200 });
  } catch (err) {
    console.error('Error deleting data:', err);
    return new Response(JSON.stringify({ error: 'Failed to delete user' }), { status: 500 });
  }
}
