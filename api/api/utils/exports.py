"""MySQL/MariaDB dump/backup function."""

import subprocess
from datetime import datetime
from config import Config


def dump(
    db=Config.MYSQL_DB,
    target=f"{Config.BACKUP_PATH}{Config.MYSQL_DB}-{datetime.now().strftime('%Y-%m-%d-%H%M')}.sql",
):
    """Export a SQL script describing data and schema.

    Args:
        db (str, optional): Relative path to the csv file. Defaults to
            Config.BACKUP_PATH
        target (str, optional): Relative path of export target file.

    """
    user = Config.MYSQL_USER
    pw = Config.MYSQL_PW
    child = subprocess.Popen(f"mysqldump {db} -u {user} -p{pw} > {target}", shell=True)
    print(child.poll())
    return child.poll()
