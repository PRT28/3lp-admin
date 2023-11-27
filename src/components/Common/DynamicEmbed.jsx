import React from 'react';

const DynamicMapEmbed = ({ latitude, longitude }) => {
  const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13955.914747814386!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a0876afea68431%3A0x9ac83c03b24c0355!2z4KSk4KS-IOCkleClieCksuCli-CkqOClgCwg4KSf4KS-4KSC4KSh4KS-IOCksOClh-CkguCknCwg4KSq4KSC4KSk4KSo4KSX4KSwLCDgpIngpKTgpY3gpKTgpLDgpL7gpJbgpILgpKEgMjYzMTQ1!5e0!3m2!1shi!2sin!4v1700742570555!5m2!1shi!2sin`;

  return (
    <iframe
      title="Dynamic Embedded Map"
      src={embedUrl}
      width="600"
      height="450"
      style={{ borderRadius:"20px" }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
};

export default DynamicMapEmbed;
