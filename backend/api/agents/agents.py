from pyppeteer import launch
from bs4 import BeautifulSoup
from markdownify import MarkdownConverter
from api.models.schemas import Schema_Create_Reponse

from api.models.texts import TextContent
from api.routers.texts import create_text_content


def to_markdown(soup, **options):
    return MarkdownConverter(**options).convert_soup(soup)

async def scrape_html_pages(url: str, release: str) -> None:
    browser = await launch(options={'args': ['--no-sandbox']})
    page = await browser.newPage()
    await page.goto(url, timeout=100000)
    page = await page.content()
    await browser.close()
    soup = BeautifulSoup(page, "html.parser")
    body = soup.find("body")
    content = to_markdown(soup=body)
    await create_text_content(TextContent(uri=url, content=content, name=release))
    #notes = open(f"raw_notes/alteryx/release_notes_text_{release}.txt", "w")
    #notes.write(content)
    print(f'Added release notes for {release} release')

agents_scrapers = {
    'alteryx': scrape_html_pages
}

