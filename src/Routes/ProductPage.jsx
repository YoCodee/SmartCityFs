import React, { useEffect, useState } from 'react';
import HeaderDashboard from "../Components/HeaderDash/HeaderDashboard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import Voucher from '../Components/Voucher/Voucher';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from '@react-pdf/renderer';
 // Ensure this import exists
import { useSelector } from 'react-redux';
library.add(faStar);

const generateBarcode = (text) => {
  const canvas = document.createElement('canvas');

  return canvas.toDataURL('image/png');
};

const PDFDocument = ({ reward }) => {
  const styles = StyleSheet.create({
    page: {
      padding: 20,
      backgroundColor: '#F5F5F5',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    logo: {
      width: 85,
      height: 85,
    },
    title: {
      fontSize: 24,
      textAlign: 'center',
    },
    customerInfo: {
      marginBottom: 20,
      gap: 7,
    },
    footer: {
      marginTop: 20,
      textAlign: 'center',
    },
    barcode: {
      marginTop: 10,
      textAlign: 'center',
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Reward Invoice</Text>
        </View>

        <View style={styles.customerInfo}>
          <Text>Reward Information:</Text>
          <Text>Title: {reward.name}</Text>
          <Text>Points Required: {reward.pointsRequired}</Text>
          <Text>Description: {reward.description}</Text>
        </View>

        <View style={styles.footer}>
          <Text>Thank you for your business!</Text>
          <Text>Terms and Conditions apply.</Text>
        </View>

    
      </Page>
    </Document>
  );
};

const ProductPage = () => {
  const user = useSelector((state) => state.auth.user);
  const [data, setData] = useState([]);
  const [reward, setReward] = useState([]);
  const bgColors = ['bg-yellow-400', 'bg-red-400', 'bg-green-400', 'bg-purple-400', 'bg-blue-400', 'bg-gray-400'];

  useEffect(() => {
    if (user) {
      axios.get('https://web-city-server.vercel.app/api/user/reward-history', {
        params: { userId: user._id }
      })
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error('Error fetching:', error);
        });
    }
  }, [user]);

  useEffect(() => {
    axios
      .get("https://web-city-server.vercel.app/api/user/reward")
      .then((response) => {
        setReward(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-14">
        {reward.map((rewardItem, index) => (
          <Voucher
            key={rewardItem.id}
            className={`w-[350px] ${bgColors[index % bgColors.length]}`} // Assign background color based on index
            text="sm:text-[20px]"
            icon={<FontAwesomeIcon icon={faStar} className="text-black" />}
            title={rewardItem.name}
            persentase={rewardItem.persentase}
            date={rewardItem.description}
            point={rewardItem.pointsRequired}
            rewardId={rewardItem._id}
          />
        ))}
      </div>

      <div className="mt-10">
        <h1 className='font-bold text-xl'>Reward History</h1>
        {data && data.length > 0 ? (
          <div className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-14`}>
            {data.map((rewardHistoryItem, index) => (
              <div className='flex flex-col border-2 px-4 py-2 rounded-xl shadow-xl' key={index}>
                <p className='text-sm'>{formatDate(rewardHistoryItem.dateClaimed)}</p>
                <p className='text-2xl font-bold'>{rewardHistoryItem.reward.name}</p>
                <p className='text-xl text-orange-400 font-bold text-center border-2 border-orange-400 px-2'>{rewardHistoryItem.pointsUsed}</p>
                <p className='text-xl bg-green-400 text-white w-max px-2 my-3 font-bold'>{rewardHistoryItem.rewardStatus}</p>
                {/* Use PDFDownloadLink with the current reward history item */}
                <PDFDownloadLink document={<PDFDocument reward={rewardHistoryItem.reward} />} fileName={`${rewardHistoryItem.reward.name}_Invoice.pdf`}>
                  {({ loading }) => (
                    <div className="icons bg-cyan-500 text-white px-3 flex justify-center items-center py-2 border-none">
                      <h1>{loading ? 'Loading document...' : 'View PDF'}</h1>
                    </div>
                  )}
                </PDFDownloadLink>
              </div>
            ))}
          </div>
        ) : (
          <p>No reward history found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
