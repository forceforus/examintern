import mysql from 'mysql2/promise';

export async function POST(request) {
  try {
    const { username, usersurname, usertypeid, dateofbirth,income,outcome } = await request.json();

    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

   
    const insertuser = `
      INSERT INTO user (user_name, user_surname, usertype_id, date_of_birth,income,outcome) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    // รันคำสั่ง SQL
    await connection.execute(insertuser, [username, usersurname, usertypeid, dateofbirth ,income,outcome]);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error('Error inserting data:', err);
    return new Response(JSON.stringify({ error: 'Failed to insert data' }), { status: 500 });
  }
}
