import errno
import os
from subprocess import Popen, PIPE


def shell(cmd, output=None, mode='w', cwd=None, ignore_error=False):
    """Execute a shell command.
    :param cmd: a shell command, string or list
    :param output: output stdout to the given file
    :param mode: only works with output, mode ``w`` means write,
                 mode ``a`` means append
    :param cwd: set working directory before command is executed.
    :param shell: if true, on Unix the executable argument specifies a
                  replacement shell for the default ``/bin/sh``.
    """
    if not output:
        output = os.devnull
    else:
        folder = os.path.dirname(output)
        if folder and not os.path.isdir(folder):
            os.makedirs(folder)

    try:
        p = Popen(cmd, stdin=PIPE, stdout=PIPE, stderr=PIPE, cwd=cwd,
                  shell=True)
    except OSError as e:
        print(e)
        if not ignore_error:
            raise Exception("Execute Shell Error : " + str(e))
        if e.errno == errno.ENOENT:  # file (command) not found
            print("maybe you haven't installed %s", cmd[0])
        return e
    stdout, stderr = p.communicate()
    if stderr:
        print(stderr)
        if not ignore_error:
            raise Exception("Execute Shell Error : " + str(stderr))
        return stderr
    #: stdout is bytes, decode for python3
    stdout = stdout.decode()
    with open(output, mode) as f:
        f.write(stdout)

    return stdout
