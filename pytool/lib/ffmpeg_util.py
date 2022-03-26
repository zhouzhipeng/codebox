# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.
import os

import ffmpy


def parse_thumbnail(video_path:str, filename:str, output_dir:str, capture_seconds:int=20):
    thumbnail_path = output_dir + filename.replace(".mp4", ".jpg")
    ff = ffmpy.FFmpeg(
        inputs={video_path: None},
        outputs={thumbnail_path: ['-ss', '00:00:%d.000' %capture_seconds, '-vframes', '1']}
    )
    ff.run()
    return thumbnail_path

def get_thumbnail_from_video(video_path, filename, output_dir):
    thumbnail_path = output_dir + filename.replace(".mp4", ".jpg")
    ff = ffmpy.FFmpeg(
        executable='C:\\Program Files\\ffmpeg-2022-03-07-git-e645a1ddb9-full_build\\bin\\ffmpeg.exe',
        inputs={video_path: None},
        outputs={thumbnail_path: ['-ss', '00:00:20.000', '-vframes', '1']}
    )
    ff.run()
    return thumbnail_path

def gen_html():
    content=""
    for file in os.listdir("F:\\VR"):
        if file.startswith(".") or not file.endswith(".mp4"):
            continue

        content += """
            <a href="%s" >
            <img src="%s" style="width: 600px" />
            </a>
        
        """  % (file, "images/"+file[:-4]+".jpg")

    open('F:\\VR\\index.html','w').write(content)


# Press the green button in the gutter to run the script.
def gen_thumbnails():

    output_dir="F:\\VR\\images\\"

    os.mkdir(output_dir)

    for file in os.listdir("F:\\VR"):
        if file.startswith(".") or not file.endswith(".mp4"):
            continue

        try:
            print(get_thumbnail_from_video('F:\\VR\\' + file, file, output_dir))
        except:
            print("error file: "+ file)

if __name__ == '__main__':
    gen_html()