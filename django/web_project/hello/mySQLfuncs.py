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
        
    except pymysql.Error as e:
        return f"Database error: {str(e)}"
        
    finally:
        cursor.close()
        connection.close()

def sql_validateLogin(usern, passw):
    query = f"SELECT usertype  FROM user_accounts WHERE username= '{usern}' AND password = '{passw}'"
    result = sql_sendQuery(query)
    
    if result:
        #print(result)
        return result
    else: 
        return 'deny'
        
def sql_insertAcc(usern, passw, usert, firstn, lastn, dpt):
    #q = f"INSERT INTO user_accounts (username, password, usertype, firstname, lastname, department) VALUES ('{usern}', '{passw}', '{usert}', '{firstn}', '{lastn}', '{dpt}');"   
    q="INSERT INTO z_testTable (co1) VALUES ('aaa')"
    
    insert = sql_sendQuery(q)
    print(insert)
    
    q = f"SELECT * FROM user_accounts WHERE username = '{usern}' AND password ='{passw}' and "
    result = sql_sendQuery(q)
    
    if result:
        print(result)
        return result
    else: 
        return result
    

if __name__ == "__main__":
    #print(sql_insertAcc('a', 'a', 'voter', '', '', 'HR'))
    q="INSERT INTO z_testTable (col1, col2) VALUES ('aaa', 'bbb')"
    sql_sendQuery(q)
    
