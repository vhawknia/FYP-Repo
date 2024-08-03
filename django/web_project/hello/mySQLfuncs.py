import pymysql
from .models import Election


# Replace with your database credentials
host = "23.106.49.25"
user = "gab_VIC"
password = "qwert12345!@#$%"
database = "gab_FYPdb"
port = 3306


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

    """    
    except pymysql.Error as e:
        return f"Database error: {str(e)}"
    """ 
    
    
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
    #q="INSERT INTO z_testTable (co1) VALUES ('aaa')"
    
    insert = sql_sendQuery(q)
    print(insert)
    
    q = f"SELECT * FROM user_accounts WHERE username = '{usern}' AND password ='{passw}' and "
    result = sql_sendQuery(q)
    
    if result:
        print(result)
        return result
    else: 
        return result
    





##### gab functions

def get_user_related_elections(username, department):
    # Define the SQL query with string formatting for parameters
    query = f"""
        SELECT e.*
        FROM elections e
        WHERE JSON_CONTAINS(e.voters, '{{"username": "{username}"}}')
          OR JSON_CONTAINS(e.votersDept, '{{"departmentname": "{department}"}}')
    """
    
    # Execute the query and fetch the results
    result = sql_sendQuery(query)

    if result:
        # Example column names, adjust according to your database schema
        column_names = ['id', 'title', 'description', 'startDate', 'endDate', 'timezone',
                        'electionType','candidates','topics', 'voters', 'votersDept', 'status']

        elections = [
            dict(zip(column_names, row))
            for row in result
        ]
        return elections
    else:
        return []
    
# Execute the query for the user 'voter001' from the 'IT' department
# user_related_elections = get_user_related_elections('voter001', 'IT')

# # Print the results
# for election in user_related_elections:
#     print(election)
