var Endian={BIG:0,LITTLE:1};var ZipConstants={LOCSIG:67324752,LOCHDR:30,LOCVER:4,LOCNAM:26,EXTSIG:134695760,EXTHDR:16,CENSIG:33639248,CENHDR:46,CENVER:6,CENNAM:28,CENOFF:42,ENDSIG:101010256,ENDHDR:22,ENDTOT:10,ENDOFF:16,STORED:0,DEFLATED:8};var Base64=function(s){var u=undefined;if(navigator.userAgent.toLowerCase().indexOf(" chrome/")>=0||navigator.userAgent.toLowerCase().indexOf(" firefox/")>=0||navigator.userAgent.toLowerCase().indexOf(" gecko/")>=0){u=function(){this.str="";this.length=0;this.append=function(a){this.str+=a;this.length+=a.length};this.prepend=function(a){this.str=a+this.str;this.length+=a.length};this.toString=function(){return this.str}}}else{u=function(){this.parts=[];this.length=0;this.append=function(a){this.parts.push(a);this.length+=a.length};this.prepend=function(a){this.parts.unshift(a);this.length+=a.length};this.toString=function(){return this.parts.join("")}}}var j="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var e=new u(),t,r,q,p,n,m,l,k=0;while(k<s.length){t=s.charCodeAt(k++);r=s.charCodeAt(k++);q=s.charCodeAt(k++);p=t>>2;n=((t&3)<<4)|(r>>4);m=((r&15)<<2)|(q>>6);l=q&63;if(isNaN(r)){m=l=64}else{if(isNaN(q)){l=64}}e.append(j.charAt(p)+j.charAt(n)+j.charAt(m)+j.charAt(l))}return e.toString()};var BA=function(h,f){var e="",b=0,a=0,c=0;if(h){e=h||"";c=f!==undefined?f:c;b=h.length}var d=typeof h!="string"&&h!==undefined;var g=function(i){throw i};return{position:function(i){if(i){a=i}else{return a}},move:function(i){a+=i},bytesAvailable:function(){return b-a},length:function(){return b},endian:function(i){if(i){c=i}else{return c}},data:function(i){if(i){e=i||"";b=e.length;d=typeof i!="string"&&i!==undefined}else{return e}},readByte:function(){if(this.bytesAvailable()===0){g("readByte::End of stream!")}return d?e[a++]&255:(e.charCodeAt(a++)&255)},readByteAt:function(i){if(i<b){return d?e[i]&255:e.charCodeAt(i)&255}return g("readByteAt::End of stream")},writeByte:function(i){if(d){if(a<b){e[a]=i&255}else{e[e.length++]=i}a++;return}if(a<b){e=e.substr(0,a)+String.fromCharCode(i&255)+e.substring(a+1)}else{e+=String.fromCharCode(i&255);b+=1}a++},readBytes:function(r,o){if(o===undefined){var q=a;a+=r;if(d){var n="";for(var m=q;m<q+r;m++){n+=String.fromCharCode(e[m])}return n}else{return e.substr(q,r)}}if(d){var k="";for(var l=r;l<r+o;l++){k+=String.fromCharCode(e[l])}return k}return e.substr(r,o)},readUnsignedInt:function(){if(this.bytesAvailable()<4){throw"End of stream!"}var j=0,i=0;if(c==Endian.BIG){j=(a+=4)-4;if(d){i=((e[j]&255)<<24)|((e[++j]&255)<<16)|((e[++j]&255)<<8)|(e[++j]&255)}else{i=((e.charCodeAt(j)&255)<<24)|((e.charCodeAt(++j)&255)<<16)|((e.charCodeAt(++j)&255)<<8)|(e.charCodeAt(++j)&255)}}else{j=(a+=4);if(d){i=((e[--j]&255)<<24)|((e[--j]&255)<<16)|((e[--j]&255)<<8)|(e[--j]&255)}else{i=((e.charCodeAt(--j)&255)<<24)|((e.charCodeAt(--j)&255)<<16)|((e.charCodeAt(--j)&255)<<8)|(e.charCodeAt(--j)&255)}}return i},readUnsignedShort:function(){if(this.bytesAvailable()<2){throw"End of stream!"}var i=0;if(c==Endian.BIG){i=(a+=2)-2;if(d){return((e[i]&255)<<8)|(e[++i]&255)}else{return((e.charCodeAt(i)&255)<<8)|(e.charCodeAt(++i)&255)}}else{i=(a+=2);if(d){return((e[--i]&255)<<8)|(e[--i]&255)}else{return((e.charCodeAt(--i)&255)<<8)|(e.charCodeAt(--i)&255)}}},readShort:function(){if(this.bytesAvailable()<2){throw"End of stream!"}var j=0,i=0;if(c==Endian.BIG){j=(a+=2)-2;if(d){i=((e[j]&255)<<8)|(e[++j]&255)}else{i=((e.charCodeAt(j)&255)<<8)|(e.charCodeAt(++j)&255)}}else{j=(a+=2);if(d){i=((e[--j]&255)<<8)|(e[--j]&255)}else{i=((e.charCodeAt(--j)&255)<<8)|(e.charCodeAt(--j)&255)}}return(i>=32768)?i-65536:i},readUTFBytes:function(l){l=l||0;var j="";for(var k=0;k<l;k++){j+=String.fromCharCode(this.readByte())}return j}}};var Inflater=function(){var p=15,g=286,d=30,e=316,k=288,b=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258],o=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],l=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],h=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],a=undefined,v=0,u=0,r=0,s=undefined,c=undefined;function q(w){var x=u;while(r<w){if(v==a.length()){throw"available inflate data did not terminate"}x|=a.readByteAt(v++)<<r;r+=8}u=x>>w;r-=w;return x&((1<<w)-1)}function n(x,y,C){var A=new Array();for(var w=0;w<=p;w++){x.count[w]=0}for(var z=0;z<C;z++){x.count[y[z]]++}if(x.count[0]==C){return 0}var B=1;for(w=1;w<=p;w++){B<<=1;B-=x.count[w];if(B<0){return B}}A[1]=0;for(w=1;w<p;w++){A[w+1]=A[w]+x.count[w]}for(z=0;z<C;z++){if(y[z]!==0){x.symbol[A[y[z]]++]=z}}return B}function j(y){var A=0,B=0,x=0;for(var w=1;w<=p;w++){A|=q(1);var z=y.count[w];if(A<B+z){return y.symbol[x+(A-B)]}x+=z;B+=z;B<<=1;A<<=1}return -9}function t(x){do{var y=j(s);if(y<0){return y}if(y<256){x.position(x.length());x.writeByte(y)}else{if(y>256){y-=257;if(y>=29){throw"invalid literal/length or distance code in fixed or dynamic block"}var w=b[y]+q(o[y]);y=j(c);if(y<0){return y}var z=l[y]+q(h[y]);if(z>x.length()){throw"distance is too far back in fixed or dynamic block"}x.position(x.length());while(w--){x.writeByte(x.readByteAt(x.length()-z))}}}}while(y!=256);return 0}function i(x){u=0;r=0;if(v+4>a.length()){throw"available inflate data did not terminate"}var w=a[v++];w|=a[v++]<<8;if(a[v++]!=(~w&255)||a[v++]!=((~w>>8)&255)){throw"stored block length did not match one's complement"}if(v+w>a.length()){throw"available inflate data did not terminate"}while(w--){x[x.length]=a[v++]}}function m(){var x=new Array();for(var w=0;w<144;w++){x[w]=8}for(;w<256;w++){x[w]=9}for(;w<280;w++){x[w]=7}for(;w<k;w++){x[w]=8}n(s,x,k);for(w=0;w<d;w++){x[w]=5}n(c,x,d)}function f(){var y=new Array(),x=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],E=q(5)+257,w=q(5)+1,C=q(4)+4;if(E>g||w>d){throw"dynamic block code description: too many length or distance codes"}for(var D=0;D<C;D++){y[x[D]]=q(3)}for(;D<19;D++){y[x[D]]=0}var A=n(s,y,19);if(A!==0){throw"dynamic block code description: code lengths codes incomplete"}D=0;while(D<E+w){var z=j(s),B;if(z<16){y[D++]=z}else{B=0;if(z==16){if(D===0){throw"dynamic block code description: repeat lengths with no first length"}B=y[D-1];z=3+q(2)}else{if(z==17){z=3+q(3)}else{z=11+q(7)}}if(D+z>E+w){throw"dynamic block code description: repeat more than specified lengths"}while(z--){y[D++]=B}}}A=n(s,y,E);if(A<0||(A>0&&E-s.count[0]!=1)){throw"dynamic block code description: invalid literal/length code lengths"}A=n(c,y.slice(E),w);if(A<0||(A>0&&w-c.count[0]!=1)){throw"dynamic block code description: invalid distance code lengths"}return A}return{setInput:function(w){a=w;a.endian(Endian.LITTLE);a.position(0)},inflate:function(w){v=u=r=0;var z=0;do{var y=q(1);var x=q(2);if(x===0){i(w)}else{if(x==3){throw"invalid block type (type == 3)"}else{s={count:new Array(0),symbol:new Array(0)};c={count:new Array(0),symbol:new Array(0)};if(x==1){m()}else{if(x==2){z=f()}}if(z!==0){return z}z=t(w)}}if(z!==0){break}}while(!y);return z}}};var ZipEntry=function(e){var c=e,d=0,b=0,a=0,f=0;return{name:function(){return c},time:function(h){var g;if(h){g=new Date(time);d=(g.fullYear-1980&127)<<25|(g.month+1)<<21|g.day<<16|g.hours<<11|g.minutes<<5|g.seconds>>1}else{g=new Date(((d>>25)&127)+1980,((d>>21)&15)-1,(d>>16)&31,(d>>11)&31,(d>>5)&63,(d&31)<<1);return g.getTime()}},size:0,compressedSize:0,crc:0,method:0,extra:undefined,comment:"",isDirectory:function(){return c.charAt(c.length-1)=="/"}}};var ZipFile=function(f){var c=undefined,h=[],e={},b={};c=new BA(f.data(),Endian.LITTLE);a();function a(){g();e={};b={};for(var k=0;k<h.length;k++){var m=new BA(c.readBytes(ZipConstants.CENHDR),Endian.LITTLE);if(m.readUnsignedInt()!=ZipConstants.CENSIG){throw"readEntries::Invalid CEN header (bad signature)"}m.position(28);var j=m.readUnsignedShort();if(j===0){throw"missing entry name"}var l=new ZipEntry(c.readUTFBytes(j));j=m.readUnsignedShort();l.extra=new BA();if(j>0){l.extra.data(c.readBytes(j))}c.move(m.readUnsignedShort());m.position(6);l.version=m.readUnsignedShort();l.flag=m.readUnsignedShort();if((l.flag&1)==1){throw"readEntries::Encrypted ZIP entry not supported"}l.method=m.readUnsignedShort();l.dostime=m.readUnsignedInt();l.crc=m.readUnsignedInt();l.compressedSize=m.readUnsignedInt();l.size=m.readUnsignedInt();h[k]=l;e[l.name()]=l;m.position(42);b[l.name()]=m.readUnsignedInt()}}function g(){var i=new BA();i.endian(Endian.LITTLE);i.data(c.readBytes(d(),ZipConstants.ENDHDR));i.position(ZipConstants.ENDTOT);h=new Array(i.readUnsignedShort());i.position(ZipConstants.ENDOFF);c.position(i.readUnsignedInt())}function d(){var j=c.length()-ZipConstants.ENDHDR;var k=Math.max(0,j-65535);for(j;j>=k;j--){c.position(j);if(c.readByte()!=80){continue}c.position(j);if(c.readUnsignedInt()==101010256){return j}}throw"findEND::Invalid zip"}return{entries:function(){return h},size:function(){return h.length},getEntry:function(i){return e[i]},getInput:function(l){c.position(b[l.name()]+30-2);var i=c.readShort();c.move(l.name().length+i);var k=new BA();if(l.compressedSize>0){k.data(c.readBytes(l.compressedSize))}switch(l.method){case 0:return k;break;case 8:var j=new BA();var m=new Inflater();m.setInput(k);m.inflate(j);j.position(0);return j;break;default:throw"zipEntry::getInput::Invalid compression method"}}}};var ZipLoader=function(zipURL){var ZIP_CACHE={},ZIP_FILE_REG=new RegExp(".*?.zip$","i"),ZIP_ENTRY_REG=new RegExp("(.*?.zip)://(.*$)","i"),_zipUrl=zipURL,_entryUrl="",_entryDataFormat="",iscr=true,data=undefined;if(_zipUrl){loadBinaryResource(_zipUrl)}function isIE(){return navigator.userAgent.match(/MSIE/)!==null}function getXMLHttpObj(){if(typeof(XMLHttpRequest)!="undefined"){return new XMLHttpRequest()}var axO=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.4.0","Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP","Microsoft.XMLHTTP"],i;for(i=0;i<axO.length;i++){try{return new ActiveXObject(axO[i])}catch(e){}}return null}function loadBinaryResource(url){var req=getXMLHttpObj();req.open("GET",url,false);if(!req.overrideMimeType){var vbScript='<script type="text/vbscript">\n<!--\nFunction BinaryToArray(Binary)\n  Dim i\n  ReDim byteArray(LenB(Binary))\n  For i = 1 To LenB(Binary)\n    byteArray(i-1) = AscB(MidB(Binary, i, 1))\n  Next\n  BinaryToArray = byteArray\nEnd Function\n-->\n<\/script>';document.write(vbScript);req.setRequestHeader("Accept-Charset","x-user-defined");req.send();var fileContents=BinaryToArray(req.responseBody).toArray();onlc(fileContents)}else{req.overrideMimeType("text/plain; charset=x-user-defined");req.send();onlc(req.responseText)}}function onlc(data){if(iscr){var zipfile=new ZipFile(new BA(data,Endian.LITTLE));ZIP_CACHE[_zipUrl]=zipfile;dataFromZip(zipfile)}}function dataFromZip(zip){if(zip&&_entryUrl){data=getZipEntry(zip,_entryUrl)}}function getZipEntry(zip,entryUrl){if(ZIP_ENTRY_REG.test(entryUrl)){var result=ZIP_ENTRY_REG.exec(entryUrl);var outerEntry=result[1];var innerEntry=result[2];var innerZip=new ZipFile(zip.getInput(zip.getEntry(outerEntry)));return getZipEntry(innerZip,innerEntry)}else{var entry=zip.getEntry(entryUrl);if(entry){return zip.getInput(entry)}else{throw"Requested file was not found in the archive"}}}function appendChild(node,text){if(null===node.canHaveChildren||node.canHaveChildren){node.appendChild(document.createTextNode(text))}else{node.text=text}}function getFileExtension(filename){return(/[.]/.exec(filename))&&/[^.]+$/.exec(filename)[0]||""};function _utf8_decode(utftext){if(utftext.charCodeAt(0)==0xef&&utftext.charCodeAt(1)==0xbb&&utftext.charCodeAt(2)==0xbf){utftext=utftext.substr(3);var string="",i=0,c=c1=c2=0;while(i<utftext.length){c=utftext.charCodeAt(i);if(c<128){string+=String.fromCharCode(c);i++;}else if((c>191)&&(c<224)){c2=utftext.charCodeAt(i+1);string+=String.fromCharCode(((c&31)<<6)|(c2&63));i+=2;}else{c2=utftext.charCodeAt(i+1);c3=utftext.charCodeAt(i+2);string+=String.fromCharCode(((c&15)<<12)|((c2&63)<<6)|(c3&63));i+=3;}}return string;}return utftext;}return{load:function(url){iscr=false;switch(true){case ZIP_ENTRY_REG.test(url):var result=ZIP_ENTRY_REG.exec(url);_zipUrl=result[1];_entryUrl=result[2];var zip=ZIP_CACHE[_zipUrl];if(zip){dataFromZip(zip)}else{iscr=true;loadBinaryResource(url)}break;case ZIP_FILE_REG.test(url):iscr=true;_zipUrl=url;_entryDataFormat="Text";loadBinaryResource(url);break;default:loadBinaryResource(url);break}if(data){data.position(0);return _utf8_decode(data.readBytes(0,data.length()))}else{return""}},loadImage:function(url){var data=this.load(url);if(data){var tmp="data:";switch(getFileExtension(url).toLowerCase()){case"gif":tmp+="image/gif;base64,";break;case"png":tmp+="image/png;base64,";break;case"jpg":case"jpeg":tmp+="image/jpeg;base64,";break}tmp+=Base64(data)}return tmp},loadCSS:function(url){var data=_utf8_decode(this.load(url));if(data){var pa=document.getElementsByTagName("head")[0];var el=document.createElement("style");el.type="text/css";el.media="screen";if(el.styleSheet){el.styleSheet.cssText=data}else{el.appendChild(document.createTextNode(data))}pa.appendChild(el)}},loadScript:function(url){var data=_utf8_decode(this.load(url));if(data){var fileRef=window.document.createElement("script");fileRef.setAttribute("type","text/javascript");if(isIE()){eval(data)}else{var head=document.getElementsByTagName("head")[0]||document.documentElement;head.insertBefore(fileRef,head.firstChild);appendChild(fileRef,data)}}}}};