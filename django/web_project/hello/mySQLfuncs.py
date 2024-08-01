import pymysql


# Replace with your database credentials

host = "23.106.49.25"
user = "gab_VIC"
password = "qwert12345!@#$%"
database = "gab_FYPdb"
port = 3306


#working code but not safe. Should instead ask for specific details rather than fetching wholesale?
"""
def fetch_data(q):
   try:
       connection = pymysql.connect(
           host=host,
           user=user,
           password=password,
           database=database
       )
       
       cursor = connection.cursor()
       
       query = q
       cursor.execute(query)
       result = cursor.fetchall()

       for row in result:
           print(row)

   except pymysql.Error as e:
       print("Error:", e)

   finally:
       cursor.close()
       connection.close()
"""


def sql_validateLogin(usern, passw):
    try:
        connection = pymysql.connect(
           host=host,
           user=user,
           password=password,
           database=database
        )

        cursor = connection.cursor()

        query = f"SELECT usertype  FROM user_accounts WHERE username= '{usern}' AND password = '{passw}'"
        cursor.execute(query)
        result = cursor.fetchall()
        
        if result:
            #print(result)
            return result[0][0]
        else: 
            return 'deny'
        
    except pymysql.Error as e:
        print("Error:", e)

    finally:
        cursor.close()
        connection.close()


if __name__ == "__main__":
    print(sql_validateLogin("voter001", "password123"))
