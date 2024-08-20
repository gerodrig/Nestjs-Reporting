import type {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { CurrencyFormatter, DateFormatter } from 'src/helpers';
import { footerSection } from './sections/footer.section';

type ReportValues = {
  title?: string;
  subTitle?: string;
  data: any;
};

const logo: Content = {
  image: 'src/assets/banner.png',
  width: 150,
  height: 80,
  margin: [20, 40],
};

const styles: StyleDictionary = {
  header: {
    fontSize: 18,
    bold: true,
    margin: [0, 20, 0, 0],
  },
  subHeader: {
    fontSize: 16,
    bold: true,
    margin: [0, 20, 0, 0],
  },
};

export const orderByIdReport = (value: ReportValues): TDocumentDefinitions => {
  const { data } = value;

  const { order_id, order_date, order_details, customers: customer } = data;

  console.log(data, order_details);

  const subTotal = order_details.reduce(
    (acc: number, orderDetail: any) =>
      acc + orderDetail.quantity * +orderDetail.products.price,
    0,
  );

  const tax = subTotal * 0.13;

  const total = subTotal + tax;

  return {
    //? Header
    styles,
    header: logo,
    pageMargins: [20, 120, 20, 40],
    footer: footerSection,
    //? Content
    content: [
      {
        text: 'Benito ICS',
        style: 'header',
      },

      //? Address and Receipt No
      {
        columns: [
          {
            text: '22828 100th Ave SE, Kent, WA 98031',
          },
          {
            text: [
              {
                text: `${order_id}\n`,
                bold: true,
              },
              `Date: ${DateFormatter.getDDMMMMYYYY(order_date)}\n`,
            ],
            alignment: 'right',
          },
        ],
      },

      //? QR Code
      {
        qr: 'https://www.gerar.ca',
        fit: 75,
        alignment: 'right',
        margin: [0, 10],
      },

      //? Customer Address
      {
        text: [
          {
            text: `Customer: ${customer.customer_name}\n`,
            style: 'subHeader',
          },
          `Address: ${customer.customer_address}, ${customer.city}, ${customer.postal_code}, ${customer.country}\n`,
          `Phone: 123-456-7890\n`,
          `Email: Jhon.Doe@google.com\n`,
        ],
      },

      //? Order Detail table
      {
        layout: 'headerLineOnly',
        margin: [0, 20],
        table: {
          headerRows: 1,
          widths: [50, '*', 'auto', 'auto', 'auto'],
          body: [
            ['Id', 'Name', 'Qty', 'Price', 'Total'],
            //? Data

            ...order_details.map((orderDetail: any) => [
              orderDetail.product_id.toString(),
              orderDetail.products.product_name,
              orderDetail.quantity.toString(),
              CurrencyFormatter.formatCurrency(+orderDetail.products.price),
              {
                text: CurrencyFormatter.formatCurrency(
                  orderDetail.quantity * +orderDetail.products.price,
                ),
                alignment: 'right',
              },
            ]),
          ],
        },
      },

      //? Line break
      '\n\n',

      //? Totals
      {
        columns: [
          { width: '*', text: '' },
          {
            width: 'auto',
            layout: 'noBorders',
            table: {
              body: [
                [
                  'Subtotal',
                  {
                    text: CurrencyFormatter.formatCurrency(subTotal),
                    alignment: 'right',
                  },
                ],
                [
                  'Tax 13%',
                  {
                    text: CurrencyFormatter.formatCurrency(tax),
                    alignment: 'right',
                  },
                ],
                [
                  { text: 'Total', bold: true },
                  {
                    text: CurrencyFormatter.formatCurrency(total),
                    bold: true,
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  };
};
