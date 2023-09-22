import { NextResponse } from 'next/server'
import * as PDFJS from 'pdfjs-dist';
import { TextItem } from 'pdfjs-dist/types/src/display/api';
//import workerSrc from 'pdfjs-dist/build/pdf.worker.js';

interface IPdfInPages {
  [x: number]: string[]
}

enum CONFIGS {
  FIRST_PAGE = 32,
  LAST_PAGE = 38,
  LAST_ITEM_ROW = 'lactose',
  INITIAL_LETTER = 'P-'
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as unknown as File;
  // PDFJS.GlobalWorkerOptions.workerSrc = workerSrc

  if (!file) {
    return NextResponse.json({ message: 'Deu ruim' })
  }

  const bytes = await file.arrayBuffer();

  const pdfDoc = await PDFJS.getDocument(bytes).promise;
  const numPages = pdfDoc.numPages;
  const pdfInPages: IPdfInPages = {}

  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    const page = await pdfDoc.getPage(pageNum);
    const textContent = await page.getTextContent();

    if (!pdfInPages[pageNum]) {
      pdfInPages[pageNum] = []
    }

    textContent.items.forEach((item) => {
      const { str } = item as TextItem;

      if (str) {
        pdfInPages[pageNum].push(str);
      }
    })
  }

  const portionsData = Object.entries(pdfInPages)
    .filter(([key]) => +key >= CONFIGS.FIRST_PAGE && +key <= CONFIGS.LAST_PAGE)
    .reduce((acc, [, values]: [string, string[]]) => {

      values.forEach((text) => {
        const lastArrayIndex = acc.length - 1;

        if (!acc[lastArrayIndex]) {
          acc[lastArrayIndex] = []
        }

        const cleanText = text.trim()

        if (cleanText) {
          acc[lastArrayIndex].push(text)
        }

        if (cleanText.toLocaleLowerCase().includes(CONFIGS.LAST_ITEM_ROW)) {
          acc.push([])
        }
      })

      return acc;
    }, [] as Array<string[]>)


  const normalizeData = portionsData.filter(item => !!item.length)
    .map((option) => {

      const index = option.findIndex(item => item.startsWith(CONFIGS.INITIAL_LETTER));
      const cleanRow = index !== -1 ? option.slice(index) : option;

      const [code, fistName, secondName, ...rest] = cleanRow

      if (code.startsWith(CONFIGS.INITIAL_LETTER)) {
        if (cleanRow.length === 7) {
          return cleanRow;
        }

        if (cleanRow.length === 8) {
          const newOption = [code, `${fistName} ${secondName}`, ...rest];

          return newOption
        }
      }

      return cleanRow
    })

  normalizeData.forEach((item, index) => {
    if (item.length > 7) {
      console.warn(index)
    }
  })

  return NextResponse.json(normalizeData)
}

export const config = {
  api: {
    bodyParser: false
  }
}

