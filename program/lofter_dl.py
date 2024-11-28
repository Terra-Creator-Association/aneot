import requests
import time

def download_image(url, save_path, referer):
    # 设置请求头，包括Referer和User-Agent
    headers = {
        'Referer': referer,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    # 发送GET请求获取图片内容
    response = requests.get(url, headers=headers)
    
    # 检查响应状态码
    if response.status_code == 200:
        # 如果请求成功，将图片内容写入文件
        with open(save_path, 'wb') as file:
            file.write(response.content)
        print(f"Image downloaded successfully and saved to {save_path}")
    else:
        # 如果请求失败，打印错误信息
        print(f"Failed to download image. Status code: {response.status_code}")

# 使用示例
image_url = 'https://imglf6.lf127.net/img/7bd94e14b0e0c7fd/bThuanRzVjFtUXNvNHBHcjgrQkRXeHg0VE1GVHEzUCtuMml0aGI3UlhJZz0.jpg?imageView&thumbnail=1680x0&quality=96&stripmeta=0&type=jpg'
save_path = time.strftime('%Y%m%d%H%M%S') + '.jpg'
referer = 'https://xingyunguiji.lofter.com/'

# 调用函数下载图片
download_image(image_url, save_path, referer)
