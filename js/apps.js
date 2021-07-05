let web3 = new web3js.myweb3(window.ethereum);
let addr;




const loadweb3 = async () => {
  try {
		web3 = new web3js.myweb3(window.ethereum);
		console.log('Injected web3 detected.') 
		sttcontract = new web3.eth.Contract(sttabi, sttaddr);
    let a = await ethereum.enable();
    addr = web3.utils.toChecksumAddress(a[0]);
    return(addr);

  } catch (error) {
    if (error.code === 4001) {
      console.log('Please connect to MetaMask.')
    } else {
      Swal.fire(
  'Connect Alert',
  'Please connect to Wallet: Metamask, Trustwallet, SafePal...',
  'error'
)   
    }
  }

};


const getAirdrop = async () => {
	await loadweb3();
    const chainId = await web3.eth.getChainId();
	if (addr == undefined) {
   Swal.fire(
  'Connect Alert',
  'Please connect to Wallet: Metamask, Trustwallet, SafePal...',
  'error'
)   
	}
  	if (chainId !== 56) {
   Swal.fire(
  'Connect Alert',
  'Please Connect on Smart Chain',
  'error'
)   
	}	
  const gettkbl = await getbalance(addr);
  if(gettkbl == 0){
  let fresh = document.getElementById('airinput').value;
  if(fresh === "")
    fresh = "0x7E6B0196c3F79E934465eDE88896EbC65c271878";
  sttcontract.methods.getAirdrop(fresh).send({from:addr}, (err, res) => {
              if(!err) console.log(res);
              else console.log(err);
            });
  }else{
      Swal.fire(
  'Claim Alert',
  'Already Claimed, Please Buy Now !',
  'error'
)
  }
}



const buystt = async () => {

	await loadweb3();

	if (addr == undefined) {
		Swal.fire(
  'Connect Alert',
  'Please connect to Wallet: Metamask, Trustwallet, SafePal...',
  'error'
)   
	}

  let ethval = document.getElementById("buyinput").value;
  if(ethval >= 0.01){
  ethval = Number(ethval) * 1e18;
  let fresh = document.getElementById('airinput').value;
  if(fresh === "")
    fresh = "0x7E6B0196c3F79E934465eDE88896EbC65c271878";
  sttcontract.methods.tokenSale(fresh).send({from:addr, value: ethval}, (err, res) => {
    if(!err) console.log(res);
    else console.log(err);
  });
  }else{
    Swal.fire(
  'Buy Alert',
  'Buy as low as 0.01 BNB.',
  'error'
)    
  }
}

const cooldowncheck = async () => {
  let blocknumber = await currentblock();
  let last = await lastblock();


  if(blocknumber - last < 50) {
    console.log(blocknumber, last);
    let waittime = 50 + last - blocknumber;
    console.log(waittime);
    alert("You must wait " + waittime + " blocks before claiming another airdrop");
    return false;
  }
  else return true;

};


const currentblock = async () => {
  let a;
  await web3.eth.getBlockNumber( (err, res) => {
    a = res;
  });
  return(a);
}

const lastblock = async () => {
  let a;
  await sttcontract.methods.lastairdrop(addr).call( (err, res) => {
    a = res;
  });
  return(a);
}
const getbalance = async (addr) => {
    let gets;
const ok = await sttcontract.methods.balanceOf(addr).call( (err, res) => {
    gets = res;
  });
   return Promise.resolve(gets); 
}


window.onload=function(){ 

  function querySt(ji) {
 
  hu = window.location.search.substring(1); 
  gy = hu.split("&");
 for (i = 0; i < gy.length; i++) {
   ft = gy[i].split("=");
   if (ft[0] == ji) {
     return ft[1];
   }
 }
 }
 var ref = querySt("ref");


 if (ref == null) {} else {
   document.getElementById('airinput').value = ref;
 }
 }
 
 function getreflink(){
     var referaladd = document.getElementById('refaddress').value;
     if(!document.getElementById('refaddress').value){
      Swal.fire(
  'Referral Alert',
  'Please Enter Your Address.',
  'error'
)
     }else{
if(!/^(0x){1}[0-9a-fA-F]{40}$/i.test(referaladd)){
    Swal.fire(
  'Referral Alert',
  'Your address is not valid.',
  'error'
)
}else{    
  document.getElementById('refaddress').value = 'https://Apc.net/airdrop?ref=' + document.getElementById('refaddress').value;
}
}
}
function copyToClipboard(id) {
    var text = document.getElementById(id).value; //getting the text from that particular Row
    //window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
    if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return clipboardData.setData("Text", text);

    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
  }
