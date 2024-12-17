import mysql from 'mysql2/promise';

export async function GET(request) {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    // คำสั่ง SQL ที่ใช้ JOIN กับตาราง usertype และดึงข้อมูล income, outcome
    const query = `
      SELECT u.user_id, u.user_name, u.user_surname, ut.usertype_name, u.date_of_birth,
        TIMESTAMPDIFF(YEAR, u.date_of_birth, CURDATE()) AS age, u.income, u.outcome
      FROM user u
      JOIN usertype ut ON u.usertype_id = ut.usertype_id;
    `;
    
    const [rows] = await connection.execute(query);
    
    return new Response(JSON.stringify({ success: true, data: rows }), { status: 200 });
  } catch (err) {
    console.error('Error fetching data:', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), { status: 500 });
  }
}
