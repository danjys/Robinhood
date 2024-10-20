from bs4 import BeautifulSoup
import requests

#web scraper
def scrape_stock(ticker_symbol):
    url = "https://finance.yahoo.com/quote/" + ticker_symbol;
    response = requests.get(url);
    
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        stock_price = soup.find('fin-streamer', {'data-field': 'regularMarketPrice'}).text
        stock_price_change_today = soup.find('fin-streamer', {'data-field': 'regularMarketChange'}).text  
        stock_price_percent_today = soup.find('fin-streamer', {'data-field': 'regularMarketChangePercent'}).text  

        market_cap = soup.find('fin-streamer', {'data-field': 'marketCap'}).text
        return {
            'price' : stock_price,
            'change_today' : stock_price_change_today,
            'percent_change' : stock_price_percent_today,
            'market_cap' : market_cap
        }
    else:
        return None

companies = ["NVDA", "AAPL", "MSFT", "META", "GOOG", "AMZN", "TSLA"]
for company in companies:
  print(company)
  print(scrape_stock(company))


