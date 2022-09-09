###############################################################################
# Project-specific settings
###############################################################################

# Shows debug messages while Silence is running
DEBUG_ENABLED = False

# Database connection details
DB_CONN = {
    "host": "127.0.0.1",
    "port": 3306,
    "username": "iissi_user",
    "password": "iissi$user",
    "database": "framewall",
}

# The sequence of SQL scripts located in the sql/ folder that must
# be ran when the 'silence createdb' command is issued
SQL_SCRIPTS = [
    # Reference your sql files here, e.g. "create_tables.sql"
    "create_db.sql",
    "populate_db.sql",
    "create_triggers_and_procedures.sql"


]

# The port in which the API and the web server will be deployed
HTTP_PORT = 8080

# The URL prefix for all API endpoints
API_PREFIX = "/api/v1"

# Table and fields that are used for both login and register
# Uncomment this and set up your own table and columns:

USER_AUTH_DATA = {
    "table": "Users",
    "identifier": "userName",
    "password": "password",
}

# A random string that is used for security purposes
# (this has been generated automatically upon project creation)
SECRET_KEY = "1TcD4Y8nA3atIpa-y_0I8hrvxSbjrU6CB3-CeUpEVX0"
