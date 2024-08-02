import pymysql


# Replace with your database credentials

host = "23.106.49.25"
user = "gab_VIC"
password = "qwert12345!@#$%"
database = "gab_FYPdb"
port = 3306


#working code but not safe. Should instead ask for specific details rather than fetching wholesale?

def sql_sendQuery(q):
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

       return result

   except pymysql.Error as e:
       print("Error:", e)

   finally:
       cursor.close()
       connection.close()



def sql_validateLogin(usern, passw):
    query = f"SELECT usertype  FROM user_accounts WHERE username= '{usern}' AND password = '{passw}'"
    result = sql_sendQuery(query)
    
    if result:
        #print(result)
        return result[0][0]
    else: 
        return 'deny'
        
def sql_insertAcc(usern, passw, usert, firstn, lastn, dpt):
    q = f"INSERT INTO user_accounts (username, password, usertype, firstname, lastname, department) VALUES ('{usern}', '{passw}', '{usert}', '{firstn}', '{lastn}', '{dpt}');"   
    insert = sql_sendQuery(q)
    
    q = f"SELECT * FROM user_accounts WHERE username = '{usern}'"
    result = sql_sendQuery(q)
    
    if result:
        #print(result)
        return result[0][0]
    else: 
        return 'failed'
    

if __name__ == "__main__":
    print(sql_validateLogin("voter001", "password123"))
