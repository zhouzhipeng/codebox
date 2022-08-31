import glob
import os
import shutil

# shutil.copyfile("F:/test.db", "F:/test.db.1")
# shutil.
# List all files in the home directory
# files = glob.glob(os.path.expanduser("C:\\Users\\zhouzhipeng\\AppData\\Local\\Temp\\gogo_files\\*.db.*"))
# # Sort by modification time (mtime) ascending and descending
# sorted_by_mtime_ascending = sorted(files, key=lambda t: os.stat(t).st_mtime)
# sorted_by_mtime_descending = sorted(files, key=lambda t: -os.stat(t).st_mtime)
#
# print(sorted_by_mtime_descending)
# print(sorted_by_mtime_ascending)


print(os.path.basename("F:/test.db"))