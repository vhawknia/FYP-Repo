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
        connection.commit()
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
    query = f"SELECT userid, username, firstname, lastname, department, usertype FROM user_accounts WHERE username= '{usern}' AND password = '{passw}'"
    result = sql_sendQuery(query)
    
    if result:
        return result
    else: 
        return 'deny'
        
def sql_insertAcc(usern, passw, usert, firstn, lastn, dpt):
    q = f"SELECT username FROM user_accounts WHERE username = '{usern}'"
    result = sql_sendQuery(q)
    
    if result:
        return "dup"


    q = f"INSERT INTO user_accounts (username, password, usertype, firstname, lastname, department) VALUES ('{usern}', '{passw}', '{usert}', '{firstn}', '{lastn}', '{dpt}');"   
    #q="INSERT INTO z_testTable (co1) VALUES ('aaa')"
    
    insert = sql_sendQuery(q)
    #print(insert)
    
    q = f"SELECT * FROM user_accounts WHERE username = '{usern}' AND password ='{passw}' "
    result = sql_sendQuery(q)
    
    if result:
        return 'success'
    else: 
        return 'failed'
    
    
def sql_getAccList(cond):
    q = f"SELECT userid, username, firstname, lastname, department, usertype FROM user_accounts"
    if cond != "":
        q = q + f" WHERE username LIKE '%{cond}%';"
              
    r = sql_sendQuery(q)
    
    if r:
        return r
    else: 
        return []

def sql_delAcc(uid):
    q = f"DELETE FROM election_voter_status WHERE userid = {uid};"
    r = sql_sendQuery(q)
    
    q = f"DELETE FROM user_accounts WHERE userid = {uid}"
    r = sql_sendQuery(q)
    
    q = f"SELECT username FROM user_accounts WHERE userid = {uid};"
    result = sql_sendQuery(q)
    
    if not result:
        return True
    else: 
        return False



        
def sql_updateAcc(usern, usert, frstn, lastn, dpt):
    #print(f"Username is {usern}")
    #print(f"Firstanme is {frstn}")
    #print(f"LASTNAME IS {lastn}")
    #print(f"DEPRAT IS {dpt}")
    #print(f"USERT IS {usert}")
    
    q = f"UPDATE user_accounts SET usertype = '{usert}', firstname = '{frstn}', lastname = '{lastn}', department = '{dpt}' WHERE username = '{usern}';"
    r = sql_sendQuery(q)
    
    #print(r)
    
    q = f"SELECT username FROM user_accounts WHERE usertype = '{usert}' AND firstname = '{frstn}' AND lastname = '{lastn}' AND department = '{dpt}';"
    result = sql_sendQuery(q)
    #print(result)
    
    if result:
        #print(result)
        return result
    else: 
        return "UPD STATEMENT FAILED"

def sql_updateAccPassw(usern, o_passw, n_passw):
    if sql_validateLogin(usern, o_passw) != 'deny':
        q = f"UPDATE user_accounts SET password = '{n_passw}' WHERE username = '{usern}';"
        r = sql_sendQuery(q)
        
        q = f"SELECT username FROM user_accounts WHERE usertype = '{usert}', firstname = '{firstn}', lastname = '{lastn}', department = '{dpt}' WHERE username = '{usern}';"
        result = sql_sendQuery(q)
    
    
        if result:
            #print(result)
            return True
        else: 
            return "UPD STATEMENT FAILED"
    
def sql_getDptList():
    q = f"SELECT departmentname FROM departments;"
    result = sql_sendQuery(q)
    
    #print("SEDB result is: ")
    #print(result)
    
    if result:
        return result
    else:
        return "Department table empty"



##### gab functions

import json
from django.db import connection

def get_ongoing_user_elections_with_status(userid):
    # Define the SQL query to join election_voter_status with elections for the given userid
    query = f"""
        SELECT e.*, evs.userid, evs.has_voted
        FROM election_voter_status evs
        JOIN ongoing_elections e ON evs.election_id = e.id
        WHERE evs.userid = {userid}
    """
    
    # Execute the query and fetch the results
    result = sql_sendQuery(query)

    if result:
        # Example column names including the ones from election_voter_status
        column_names = ['id', 'title', 'description', 'startDate', 'endDate', 'timezone',
                        'electionType', 'candidates', 'topics', 'voters', 'votersDept',
                        'created_at', 'updated_at', 'userid', 'has_voted']

        user_elections = []
        for row in result:
            election = dict(zip(column_names, row))
            # Parse JSON fields
            if election['candidates']:
                election['candidates'] = json.loads(election['candidates'])
            if election['topics']:
                election['topics'] = json.loads(election['topics'])
            if election['voters']:
                election['voters'] = json.loads(election['voters'])
            if election['votersDept']:
                election['votersDept'] = json.loads(election['votersDept'])
            user_elections.append(election)
        
        return user_elections
    else:
        return []




def update_election_voter_status(electionid, userid):
    query = """
        UPDATE election_voter_status
        SET has_voted = TRUE
        WHERE election_id = %s AND userid = %s;
    """
    
    with connection.cursor() as cursor:
        cursor.execute(query, [electionid, userid])
    
    
    
def retrieve_completed_election_tally(electionid):
    query = f"""
        SELECT uuid, encrypted_tally FROM encrypted_tally 
        WHERE election_id = {electionid}        
    """   
    
    results = sql_sendQuery(query)
    
    # Process the results
    if results:
        return results
    else:
        return []

