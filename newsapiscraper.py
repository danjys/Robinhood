import os
from newsapi import NewsApiClient
from dotenv import load_dotenv

load_dotenv()

news_api_key = os.getenv('NEWSAPI_KEY')

# Initialize NewsApiClient with your API key
newsapi = NewsApiClient(api_key=news_api_key)

def get_top_news(query, num_articles=5):
    # Fetch top news articles based on a search query
    news_data = newsapi.get_everything(q=query, language='en', sort_by='relevancy', page_size=num_articles)

    if news_data['status'] != 'ok':
        print("Failed to retrieve news.")
        return []

    articles = news_data['articles']
    news_list = []
    
    for article in articles:
        news_list.append({
            'title': article['title'],
            'url': article['url'],
            'source': article['source']['name'],
            'published_at': article['publishedAt']
        })

    return news_list

def print_news(news_list):
    for index, news in enumerate(news_list, start=1):
        print(f"{index}. {news['title']}")
        print(f"   Source: {news['source']}")
        print(f"   Published At: {news['published_at']}")
        print(f"   Link: {news['url']}")
        print()

if __name__ == '__main__':
    query = input("Enter your search query for news: ")
    news_list = get_top_news(query)

    if news_list:
        print(f"Top {len(news_list)} news articles for '{query}':\n")
        print_news(news_list)
    else:
        print("No news articles found.")
