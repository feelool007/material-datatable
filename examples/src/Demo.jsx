import React from "react";
import { IconButton } from "@material-ui/core";
import { DeleteForever } from "@material-ui/icons";

import { DataTable } from "../../src";

const sampleData = [
  {
    id: 1,
    first_name: "Cart",
    last_name: "Thiolier",
    email: "cthiolier0@foxnews.com",
    gender: "Male",
    ip_address: "5.227.143.97"
  },
  {
    id: 2,
    first_name: "Miltie",
    last_name: "MacNeil",
    email: "mmacneil1@infoseek.co.jp",
    gender: "Male",
    ip_address: "155.248.79.56"
  },
  {
    id: 3,
    first_name: "Edwin",
    last_name: "Hilland",
    email: "ehilland2@japanpost.jp",
    gender: "Male",
    ip_address: "152.32.73.153"
  },
  {
    id: 4,
    first_name: "Pammi",
    last_name: "Pencott",
    email: "ppencott3@about.com",
    gender: "Female",
    ip_address: "148.254.27.89"
  },
  {
    id: 5,
    first_name: "Demetris",
    last_name: "Vedenyakin",
    email: "dvedenyakin4@geocities.com",
    gender: "Female",
    ip_address: "42.243.53.99"
  },
  {
    id: 6,
    first_name: "Jany",
    last_name: "Mepsted",
    email: "jmepsted5@usnews.com",
    gender: "Female",
    ip_address: "243.55.74.67"
  },
  {
    id: 7,
    first_name: "Annemarie",
    last_name: "Lorenzetto",
    email: "alorenzetto6@google.cn",
    gender: "Female",
    ip_address: "159.172.42.121"
  },
  {
    id: 8,
    first_name: "Rina",
    last_name: "McGonigle",
    email: "rmcgonigle7@china.com.cn",
    gender: "Female",
    ip_address: "42.213.247.199"
  },
  {
    id: 9,
    first_name: "Kimbra",
    last_name: "Storton",
    email: "kstorton8@homestead.com",
    gender: "Female",
    ip_address: "243.208.62.126"
  },
  {
    id: 10,
    first_name: "Kattie",
    last_name: "Mateu",
    email: "kmateu9@census.gov",
    gender: "Female",
    ip_address: "194.31.235.236"
  },
  {
    id: 11,
    first_name: "Cheston",
    last_name: "FitzAlan",
    email: "cfitzalana@wikispaces.com",
    gender: "Male",
    ip_address: "66.67.47.52"
  },
  {
    id: 12,
    first_name: "Berkly",
    last_name: "Tunn",
    email: "btunnb@berkeley.edu",
    gender: "Male",
    ip_address: "29.215.60.189"
  },
  {
    id: 13,
    first_name: "Tybalt",
    last_name: "Eymer",
    email: "teymerc@google.nl",
    gender: "Male",
    ip_address: "218.216.122.22"
  },
  {
    id: 14,
    first_name: "Shelly",
    last_name: "Nevinson",
    email: "snevinsond@wikispaces.com",
    gender: "Female",
    ip_address: "134.19.41.160"
  },
  {
    id: 15,
    first_name: "Derk",
    last_name: "Greenhowe",
    email: "dgreenhowee@eventbrite.com",
    gender: "Male",
    ip_address: "122.162.4.183"
  },
  {
    id: 16,
    first_name: "Darrel",
    last_name: "Featley",
    email: "dfeatleyf@woothemes.com",
    gender: "Male",
    ip_address: "31.122.41.240"
  },
  {
    id: 17,
    first_name: "Karyl",
    last_name: "Bukowski",
    email: "kbukowskig@google.it",
    gender: "Female",
    ip_address: "15.34.166.216"
  },
  {
    id: 18,
    first_name: "Harper",
    last_name: "Glasson",
    email: "hglassonh@51.la",
    gender: "Male",
    ip_address: "254.177.13.60"
  },
  {
    id: 19,
    first_name: "Jessalin",
    last_name: "Rhelton",
    email: "jrheltoni@thetimes.co.uk",
    gender: "Female",
    ip_address: "88.74.40.232"
  },
  {
    id: 20,
    first_name: "Donn",
    last_name: "Foli",
    email: "dfolij@blinklist.com",
    gender: "Male",
    ip_address: "226.102.26.171"
  },
  {
    id: 21,
    first_name: "Selina",
    last_name: "Kettle",
    email: "skettlek@boston.com",
    gender: "Female",
    ip_address: "51.32.113.162"
  },
  {
    id: 22,
    first_name: "Scarlett",
    last_name: "Bolzmann",
    email: "sbolzmannl@ycombinator.com",
    gender: "Female",
    ip_address: "97.19.29.42"
  },
  {
    id: 23,
    first_name: "Caril",
    last_name: "Geffinger",
    email: "cgeffingerm@intel.com",
    gender: "Female",
    ip_address: "173.55.33.177"
  },
  {
    id: 24,
    first_name: "Carmelle",
    last_name: "Coughlin",
    email: "ccoughlinn@google.co.uk",
    gender: "Female",
    ip_address: "80.46.237.69"
  },
  {
    id: 25,
    first_name: "Jeanelle",
    last_name: "Alen",
    email: "jaleno@csmonitor.com",
    gender: "Female",
    ip_address: "191.227.148.53"
  },
  {
    id: 26,
    first_name: "Cybil",
    last_name: "Castelluzzi",
    email: "ccastelluzzip@mayoclinic.com",
    gender: "Female",
    ip_address: "163.114.59.151"
  },
  {
    id: 27,
    first_name: "Vernor",
    last_name: "Cokly",
    email: "vcoklyq@indiegogo.com",
    gender: "Male",
    ip_address: "169.70.30.16"
  },
  {
    id: 28,
    first_name: "Michelina",
    last_name: "Lauthian",
    email: "mlauthianr@homestead.com",
    gender: "Female",
    ip_address: "52.130.172.10"
  },
  {
    id: 29,
    first_name: "Onfre",
    last_name: "Wellbank",
    email: "owellbanks@loc.gov",
    gender: "Male",
    ip_address: "105.240.75.17"
  },
  {
    id: 30,
    first_name: "Lance",
    last_name: "Yallop",
    email: "lyallopt@globo.com",
    gender: "Male",
    ip_address: "102.147.12.207"
  },
  {
    id: 31,
    first_name: "Ringo",
    last_name: "Nyssens",
    email: "rnyssensu@dropbox.com",
    gender: "Male",
    ip_address: "28.232.142.26"
  },
  {
    id: 32,
    first_name: "Mariette",
    last_name: "Novkovic",
    email: "mnovkovicv@reverbnation.com",
    gender: "Female",
    ip_address: "126.96.17.42"
  },
  {
    id: 33,
    first_name: "Jobina",
    last_name: "Weben",
    email: "jwebenw@4shared.com",
    gender: "Female",
    ip_address: "6.178.102.123"
  },
  {
    id: 34,
    first_name: "Averil",
    last_name: "Fahrenbach",
    email: "afahrenbachx@stumbleupon.com",
    gender: "Male",
    ip_address: "48.133.170.59"
  },
  {
    id: 35,
    first_name: "Merrilee",
    last_name: "Oxtoby",
    email: "moxtobyy@cdbaby.com",
    gender: "Female",
    ip_address: "53.72.88.116"
  },
  {
    id: 36,
    first_name: "Buckie",
    last_name: "MacIlhargy",
    email: "bmacilhargyz@i2i.jp",
    gender: "Male",
    ip_address: "228.254.33.40"
  },
  {
    id: 37,
    first_name: "Gwenneth",
    last_name: "Todeo",
    email: "gtodeo10@phoca.cz",
    gender: "Female",
    ip_address: "179.132.207.64"
  },
  {
    id: 38,
    first_name: "Edna",
    last_name: "Cape",
    email: "ecape11@imdb.com",
    gender: "Female",
    ip_address: "213.174.240.73"
  },
  {
    id: 39,
    first_name: "Harper",
    last_name: "Franzen",
    email: "hfranzen12@xrea.com",
    gender: "Male",
    ip_address: "175.221.212.139"
  },
  {
    id: 40,
    first_name: "Burnard",
    last_name: "Weagener",
    email: "bweagener13@cisco.com",
    gender: "Male",
    ip_address: "28.133.163.191"
  },
  {
    id: 41,
    first_name: "Joete",
    last_name: "Mathias",
    email: "jmathias14@whitehouse.gov",
    gender: "Female",
    ip_address: "102.161.222.163"
  },
  {
    id: 42,
    first_name: "Ali",
    last_name: "Lawman",
    email: "alawman15@nsw.gov.au",
    gender: "Female",
    ip_address: "213.12.144.132"
  },
  {
    id: 43,
    first_name: "Kissie",
    last_name: "Bullin",
    email: "kbullin16@imageshack.us",
    gender: "Female",
    ip_address: "204.177.3.146"
  },
  {
    id: 44,
    first_name: "Guglielmo",
    last_name: "Gleave",
    email: "ggleave17@mayoclinic.com",
    gender: "Male",
    ip_address: "184.159.75.68"
  },
  {
    id: 45,
    first_name: "Kym",
    last_name: "Whitlock",
    email: "kwhitlock18@cmu.edu",
    gender: "Female",
    ip_address: "227.152.75.125"
  },
  {
    id: 46,
    first_name: "Elton",
    last_name: "Harget",
    email: "eharget19@weather.com",
    gender: "Male",
    ip_address: "162.239.182.228"
  },
  {
    id: 47,
    first_name: "Mead",
    last_name: "Mouat",
    email: "mmouat1a@newyorker.com",
    gender: "Male",
    ip_address: "6.189.190.182"
  },
  {
    id: 48,
    first_name: "Casar",
    last_name: "Coult",
    email: "ccoult1b@europa.eu",
    gender: "Male",
    ip_address: "109.154.45.172"
  },
  {
    id: 49,
    first_name: "Jaymee",
    last_name: "Krzysztofiak",
    email: "jkrzysztofiak1c@hud.gov",
    gender: "Female",
    ip_address: "52.123.50.152"
  },
  {
    id: 50,
    first_name: "Hilario",
    last_name: "Bail",
    email: "hbail1d@craigslist.org",
    gender: "Male",
    ip_address: "233.238.23.216"
  }
];

const DeleteAction = props => {
  return (
    <IconButton onClick={() => alert("You click on id = " + props.data.id)}>
      <DeleteForever />
    </IconButton>
  );
};

export default class extends React.Component {
  headers = [
    { label: "id", column: "id" },
    { label: "first_name", column: "first_name" },
    { label: "last_name", column: "last_name" },
    { label: "email", column: "email" },
    { label: "gender", column: "gender" },
    { label: "ip_address", column: "ip_address" }
  ];

  render = () => {
    return (
      <DataTable toolbar searchable filterble csv headers={this.headers} data={sampleData}>
        <DeleteAction />
      </DataTable>
    );
  };
}
