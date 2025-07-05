import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import profile_pic from './profile_pic.png'
import dropdown_icon from './dropdown_icon.png'
import group_profiles from './group_profiles.png'
import arrow_icon from './arrow_icon.png'
import Banner from './Banner.png'
import doc_img from './doc_img.png'


import logo from './logo.png'


export const assets = {
    doc1,
    doc2,
    doc3,
    doc4,
    doc5,
    doc6,
    doc7,
    doc8,
    doc9,
    doc10,
    doc11,
    doc12,
    doc13,
    doc14,
    logo,
    profile_pic,
    dropdown_icon,
    group_profiles,
    arrow_icon,
    Banner,
    doc_img

}

export const specialityData = [
  {
    speciality: 'General physician',
    image: doc_img,
  },
  {
    speciality: 'Cardiologist',
    image: doc_img,
  },
  {
    speciality: 'Dermatologist',
    image: doc_img,
  },
  {
    speciality: 'Pediatrician',
    image: doc_img,
  },
  {
    speciality: 'Orthopedic Surgeon',
    image: doc_img,
  },
  {
    speciality: 'Gynecologist',
    image: doc_img,
  },
  {
    speciality: 'Neurologist',
    image: doc_img,
  },
];

export const doctors = [
  {
    _id: 'doc1',
    name: 'Dr. Nafis Fuad',
    image: doc1,
    speciality: 'General physician',
    degree: 'MBBS',
    experience: '1 year',
    about: 'Dr. Nafis Fuad is a compassionate physician dedicated to providing comprehensive primary care. He believes in patient-centered treatment and preventive healthcare.',
    fees: 500,
    address: {
      line1: '21, Park Street',
      line2: 'Kolkata, West Bengal, India - 700016',
    },
  },
  {
    _id: 'doc2',
    name: 'Dr. Md Shadul Islam',
    image: doc2,
    speciality: 'General physician',
    degree: 'MBBS, MD (Cardiology)',
    experience: '5 years',
    about: 'Dr. Md Shadul Islam is an experienced physician known for his expertise in diagnosing and treating general and cardiac conditions.',
    fees: 100,
    address: {
      line1: '15, Salt Lake Sector V',
      line2: 'Kolkata, West Bengal, India - 700091',
    },
  },
  {
    _id: 'doc3',
    name: 'Dr. Priya Sen',
    image: doc3,
    speciality: 'Dermatologist',
    degree: 'MBBS, MD (Dermatology)',
    experience: '3 years',
    about: 'Dr. Priya Sen specializes in skin care, acne treatment, and cosmetic dermatology. She aims to help patients feel confident in their own skin.',
    fees: 80,
    address: {
      line1: '48, Gariahat Road',
      line2: 'Kolkata, West Bengal - 700019',
    },
  },
  {
    _id: 'doc4',
    name: 'Dr. Arjun Mukherjee',
    image: doc4,
    speciality: 'General physician',
    degree: 'MBBS, MS (Orthopedics)',
    experience: '7 years',
    about: 'Dr. Arjun Mukherjee is a specialist in joint replacement and sports injuries. He believes in minimally invasive techniques for faster recovery.',
    fees: 150,
    address: {
      line1: 'Apollo Clinic, Sector 2',
      line2: 'Salt Lake, Kolkata - 700091',
    },
  },
  {
    _id: 'doc5',
    name: 'Dr. Sneha Roy',
    image: doc5,
    speciality: 'Pediatricians',
    degree: 'MBBS, DCH',
    experience: '4 years',
    about: 'Dr. Sneha Roy is a child specialist who focuses on early childhood development, nutrition, and vaccinations.',
    fees: 60,
    address: {
      line1: '34, Prince Anwar Shah Road',
      line2: 'Tollygunge, Kolkata - 700033',
    },
  },
  {
    _id: 'doc6',
    name: 'Dr. Abhishek Das',
    image: doc6,
    speciality: 'Neurologist',
    degree: 'MBBS, DM (Neurology)',
    experience: '6 years',
    about: 'Dr. Abhishek Das specializes in treating neurological disorders including epilepsy, stroke, and migraines.',
    fees: 120,
    address: {
      line1: 'Park Clinic, Ballygunge',
      line2: 'Kolkata, West Bengal - 700020',
    },
  },
  {
    _id: 'doc7',
    name: 'Dr. Ayesha Khan',
    image: doc7,
    speciality: 'Gynecologist',
    degree: 'MBBS, MS (OBGYN)',
    experience: '8 years',
    about: 'Dr. Ayesha Khan is a women’s health expert focused on pregnancy care, reproductive health, and menopause management.',
    fees: 100,
    address: {
      line1: 'Ruby General Hospital, EM Bypass',
      line2: 'Kolkata - 700107',
    },
  },
  {
    _id: 'doc8',
    name: 'Dr. Rajat Saha',
    image: doc8,
    speciality: 'General physician',
    degree: 'MBBS, MS (ENT)',
    experience: '3 years',
    about: 'Dr. Rajat Saha provides care for ear, nose, and throat conditions, including sinus problems and hearing disorders.',
    fees: 70,
    address: {
      line1: 'ENT Care, Behala',
      line2: 'Kolkata - 700034',
    },
  },
  {
    _id: 'doc9',
    name: 'Dr. Meenakshi Dutta',
    image: doc9,
    speciality: 'Neurologist',
    degree: 'MBBS, MD (Psychiatry)',
    experience: '5 years',
    about: 'Dr. Meenakshi Dutta helps patients deal with anxiety, depression, and other mental health conditions with a holistic approach.',
    fees: 90,
    address: {
      line1: 'MindCare Clinic, Lake Town',
      line2: 'Kolkata - 700089',
    },
  },
  {
    _id: 'doc10',
    name: 'Dr. Ankit Jha',
    image: doc10,
    speciality: 'General physician',
    degree: 'MBBS, MCh (Urology)',
    experience: '4 years',
    about: 'Dr. Ankit Jha is an expert in urinary tract diseases and kidney stone treatments.',
    fees: 110,
    address: {
      line1: 'Uro Clinic, Shyambazar',
      line2: 'Kolkata - 700004',
    },
  },
  {
    _id: 'doc11',
    name: 'Dr. Rituparna Chatterjee',
    image: doc11,
    speciality: 'Gynecologist',
    degree: 'MBBS, DM (Endocrinology)',
    experience: '6 years',
    about: 'Dr. Rituparna treats diabetes, thyroid, and hormonal disorders with a patient-centered approach.',
    fees: 95,
    address: {
      line1: 'EndoWell Clinic, Dum Dum',
      line2: 'Kolkata - 700028',
    },
  },
  {
    _id: 'doc12',
    name: 'Dr. Tanmoy Bhattacharya',
    image: doc12,
    speciality: 'Gastroenterologist',
    degree: 'MBBS, DM (Gastroenterology)',
    experience: '7 years',
    about: 'Dr. Tanmoy is skilled in treating digestive disorders like IBS, liver disease, and ulcers.',
    fees: 130,
    address: {
      line1: 'GastroCare, New Alipore',
      line2: 'Kolkata - 700053',
    },
  },
  {
    _id: 'doc13',
    name: 'Dr. Ananya Bose',
    image: doc13,
    speciality: 'General physician',
    degree: 'MBBS, MS (Ophthalmology)',
    experience: '3 years',
    about: 'Dr. Ananya Bose is an eye specialist focused on cataract surgery, vision correction, and eye care.',
    fees: 75,
    address: {
      line1: 'VisionPlus Clinic, Howrah',
      line2: 'West Bengal - 711101',
    },
  },
  {
    _id: 'doc14',
    name: 'Dr. Imran Farooqui',
    image: doc14,
    speciality: 'General physician',
    degree: 'BDS, MDS',
    experience: '4 years',
    about: 'Dr. Imran provides dental treatments including root canals, extractions, and smile design.',
    fees: 60,
    address: {
      line1: 'SmileCare Dental, Rajarhat',
      line2: 'Kolkata - 700135',
    },
  },
];
