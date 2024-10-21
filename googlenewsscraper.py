import requests
from bs4 import BeautifulSoup

def get_google_news(query):
    # Replace spaces with '+', to format the query for URL encoding
    query = query.replace(' ', '+')
    
    # Google News search URL
    url = f"https://news.google.com/search?q={query}"

    # Headers to mimic a real browser
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    # Send an HTTP request and fetch the page content
    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        print(f"Failed to retrieve news articles. HTTP Status code: {response.status_code}")
        return []

    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(response.content, 'html.parser')

    # Find all articles
    articles = soup.find_all('article')

    news_list = []
    for article in articles:
        # Extract the article title and link
        title_element = article.find('a', class_='DY5T1d')
        if title_element:
            title = title_element.text
            link = 'https://news.google.com' + title_element['href'][1:]  # [1:] removes the leading '.'
            news_list.append({
                'title': title,
                'link': link
            })

    return news_list

def print_news(news_list):
    for index, news in enumerate(news_list, start=1):
        print(f"{index}. {news['title']}")
        print(f"   Link: {news['link']}")
        print()

if __name__ == '__main__':
    query = input("Enter your search query for Google News: ")
    news_list = get_google_news(query)

    if news_list:
        print(f"Top {len(news_list)} news articles for '{query}':\n")
        print_news(news_list)
    else:
        print("No news articles found.")
