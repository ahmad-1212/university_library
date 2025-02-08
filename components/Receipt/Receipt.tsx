"use client";

import { Page, Text, View, Document, Font, usePDF } from "@react-pdf/renderer";

import { styles } from "./style";
import Logo from "./Logo";
import { cloneElement, ReactElement, ReactNode } from "react";
import dayjs from "dayjs";

interface ReceiptData {
  receiptId: string;
  bookTitle: string;
  bookAuthor: string;
  bookGenre: string;
  borrowDate: string | Date;
  dueDate: string | Date;
  duration?: string;
  disabled?: boolean;
}

// Register Fonts
Font.register({
  family: "IBM Plex Sans",
  src: "/fonts/IBMPlexSans-Regular.ttf",
});
Font.register({
  family: "IBM Plex Sans Bold",
  src: "/fonts/IBMPlexSans-Bold.ttf",
});

// PDF Document
const document = ({
  bookAuthor,
  bookGenre,
  bookTitle,
  borrowDate,
  dueDate,
  duration,
  receiptId,
}: ReceiptData) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Logo & Title */}
      <View style={{ paddingBottom: 10 }}>
        <View style={styles.logoContainer}>
          <Logo />
          <Text style={{ ...styles.title, fontSize: 24 }}>BookWise</Text>
        </View>
        <Text style={styles.title}>Borrow Receipt</Text>
        {/* Receipt Details */}
        <View>
          <Text style={styles.text}>
            Receipt ID:<Text style={{ color: "#E7C9A5" }}>{receiptId}</Text>{" "}
          </Text>
          <Text style={styles.text}>
            Date Issued:{" "}
            <Text style={{ color: "#E7C9A5" }}>{borrowDate.toString()}</Text>{" "}
          </Text>
        </View>
      </View>

      {/* Book Details */}
      <View style={styles.borderTop}>
        <Text
          style={{
            fontSize: 14,
            marginBottom: 15,
            fontFamily: "IBM Plex Sans Bold",
          }}
        >
          Book Details:
        </Text>
        <View style={styles.main}>
          <View style={styles.item}>
            <Text style={styles.text}>Title:</Text>
            <Text style={{ ...styles.text, fontFamily: "IBM Plex Sans Bold" }}>
              {bookTitle}
            </Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.text}>Author:</Text>
            <Text style={{ ...styles.text, fontFamily: "IBM Plex Sans Bold" }}>
              {bookAuthor}
            </Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.text}>Genre:</Text>
            <Text style={{ ...styles.text, fontFamily: "IBM Plex Sans Bold" }}>
              {bookGenre}
            </Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.text}>Borrowed on:</Text>
            <Text style={{ ...styles.text, fontFamily: "IBM Plex Sans Bold" }}>
              {borrowDate.toString()}
            </Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.text}>Due Date:</Text>
            <Text style={{ ...styles.text, fontFamily: "IBM Plex Sans Bold" }}>
              {dueDate.toString()}
            </Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.text}>Duration:</Text>
            <Text style={{ ...styles.text, fontFamily: "IBM Plex Sans Bold" }}>
              {duration}
            </Text>
          </View>
        </View>
      </View>

      {/* Terms & Footer */}
      <View style={{ ...styles.borderTop, marginTop: 20 }}>
        <Text
          style={{
            fontSize: 12,
            marginBottom: 4,
            fontFamily: "IBM Plex Sans Bold",
          }}
        >
          Terms
        </Text>
        <Text style={{ ...styles.text, paddingLeft: 10 }}>
          - Please return the book by the due date.
        </Text>
        <Text style={{ ...styles.text, paddingLeft: 10 }}>
          - Lost or damaged books may incur replacement costs.
        </Text>
      </View>

      <View style={{ ...styles.borderTop, fontSize: 12 }}>
        <Text>Thank you for using BookWise!</Text>
        <Text>Website: bookwise.example.com</Text>
        <Text>Email: support@bookwise.example.com</Text>
      </View>
    </Page>
  </Document>
);

// Download Button Component
const Receipt = ({
  children,
  disabled,
  ...detail
}: ReceiptData & { children: ReactNode }) => {
  // If disable is true return the element with low opacity
  if (disabled)
    return cloneElement(children as ReactElement<any>, {
      style: { opacity: "0.5", cursor: "not-allowed" },
    });

  const duration =
    (
      dayjs(detail.dueDate).diff(dayjs(detail.borrowDate), "days") + 1
    ).toString() + " days";

  const dueDate = dayjs(detail.dueDate).format("MMM DD YYYY");
  const borrowDate = dayjs(detail.borrowDate).format("MMM DD YYYY");
  const doc = document({ ...detail, duration, borrowDate, dueDate });
  const [instance] = usePDF({ document: doc });
  return cloneElement(children as ReactElement<HTMLAnchorElement>, {
    href: instance.url || "",
    download: detail.receiptId + ".pdf",
  });
};

export default Receipt;
