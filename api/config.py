class Config:
    # Flask options
    DEBUG = True

    # AzureAD options
    CLIENT_ID = "cc59cdac-b66d-4bc2-ba96-bf7ed965f6a5"
    CLIENT_SECRET = ""
    AUTHORITY = "https://login.microsoftonline.com/eaa4a71e-a2cd-46ab-b4da-1b9537285d07"
    REDIRECT_PATH = "/getAToken"
    ENDPOINT = "https://graph.microsoft.com/v1.0/users"
    SCOPE = ["User.ReadBasic.All"]
    SESSION_TYPE = "filesystem"

    # Meditech options
    BACKUP_PATH = "~/onedrive/phetch/backup/"
    REPORT_PATH = "/mnt/s/Statistics/"

    # SQLAlchemy options
    ADC_USER = "omniphetch"
    ADC_PW = "P#aR0v7MAn"
    ADC_SERVER = "ETCH-OMNICEN02"
    ADC_DB = "OmniCenterCPC01"
    ADC_DRIVER = "?driver=ODBC+Driver+17+for+SQL+Server"
    MYSQL_USER = "myphetch"
    MYSQL_PW = "P#aR0v7MAn"
    MYSQL_SERVER = "localhost"
    MYSQL_DB = "phetch"
    SQLALCHEMY_TRACK_MODIFICATIONS = False  # Disable deprecated feature
    SQLALCHEMY_ECHO = False
    SQLALCHEMY_DATABASE_URI = f"mysql://{MYSQL_USER}:{MYSQL_PW}@localhost/{MYSQL_DB}"
    SQLALCHEMY_BINDS = {
        "OmniCenterCPC01": f"mssql+pyodbc://{ADC_USER}:{ADC_PW}@{ADC_SERVER}/{ADC_DB}{ADC_DRIVER}"
    }

    # StatStock options
    TABLE_QUERY_URL = "https://stat-stock.com/g/111/vuetable/"
