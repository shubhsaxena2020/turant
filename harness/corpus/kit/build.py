# Starter corpora for the voice kit's other apps (khata / health / civic), written fresh (not used for tuning).
# expected: only the fields listed are scored; any other field the app returns counts as invented
# unless the case lists it in "ignore". text-slot expectations are key-word lists that must all appear.
# Run: python -I build.py  ->  khata.jsonl, health.jsonl, civic.jsonl
import json, os

HERE = os.path.dirname(os.path.abspath(__file__))


def w(name, rows):
    with open(os.path.join(HERE, name + '.jsonl'), 'w', encoding='utf8', newline='\n') as f:
        for r in rows:
            f.write(json.dumps(r, ensure_ascii=False) + '\n')


def it(qty, unit, item):
    return dict(qty=qty, unit=unit, item=item)


khata = [
    dict(id='k-hi-01', lang='hi', kind='story', text='Suresh bhaiya ne 5 kilo aata aur 1 kilo cheeni li, 320 rupaye, udhaar likh do',
         expected=dict(customer='Suresh', items=[it(5, 'kg', 'Wheat flour'), it(1, 'kg', 'Sugar')], amount=320, payment='credit')),
    dict(id='k-hi-02', lang='hi', kind='story', text='गीता दीदी ने दो पैकेट दूध लिया, सत्तर रुपये, नकद दे दिए',
         expected=dict(customer='गीता', items=[it(2, 'packet', 'Milk')], amount=70, payment='paid')),
    dict(id='k-en-03', lang='en', kind='story', text='Mrs Fernandes took 2 dozen eggs and 1 litre milk, 210 rupees, she paid by UPI',
         expected=dict(customer='Fernandes', items=[it(2, 'dozen', 'Eggs'), it(1, 'L', 'Milk')], amount=210, payment='upi')),
    dict(id='k-hi-04', lang='hi', kind='story', text='Pappu aaya tha, 500 rupaye wapas de gaya purane udhaar ke',
         expected=dict(customer='Pappu', amount=500, payment='repay')),
    dict(id='k-hi-05', lang='hi', kind='story', text='Ramesh ji ne 10 kilo chawal aur 2 litre tel liya, total 950, GPay se de diya',
         expected=dict(customer='Ramesh', items=[it(10, 'kg', 'Rice'), it(2, 'L', 'Oil')], amount=950, payment='upi')),
    dict(id='k-hi-06', lang='hi', kind='story', text='कमला ने आधा किलो चाय पत्ती ली, 180 रुपये, खाते में लिख दो',
         expected=dict(customer='कमला', items=[it(0.5, 'kg', 'Tea')], amount=180, payment='credit')),
    dict(id='k-bn-07', lang='bn', kind='story', text='রহিম দুই কেজি চাল আর এক কেজি চিনি নিয়েছে, দুশো ষাট টাকা, বাকি রাখো',
         expected=dict(customer='রহিম', items=[it(2, 'kg', 'Rice'), it(1, 'kg', 'Sugar')], amount=260, payment='credit')),
    dict(id='k-ta-08', lang='ta', kind='story', text='முருகன் மூன்று கிலோ அரிசி வாங்கினார், நூற்று ஐம்பது ரூபாய், கடன்',
         expected=dict(customer='முருகன்', items=[it(3, 'kg', 'Rice')], amount=150, payment='credit')),
    dict(id='k-mr-09', lang='mr', kind='story', text='सुनीलने दोन किलो साखर घेतली, ऐंशी रुपये, उधार',
         expected=dict(customer='सुनील', items=[it(2, 'kg', 'Sugar')], amount=80, payment='credit')),
    dict(id='k-en-10', lang='en', kind='story', text='Anil bought 3 packets of Maggi, 120 rupees cash',
         expected=dict(customer='Anil', items=[it(3, 'packet', 'Noodles')], amount=120, payment='paid')),
    dict(id='k-hi-11', lang='hi', kind='story', text='Sharma ji, number 98765 43210, 4 kilo aalu aur 2 kilo pyaaz, 180 rupaye udhaar',
         expected=dict(customer='Sharma', phone='9876543210', items=[it(4, 'kg', 'Potato'), it(2, 'kg', 'Onion')], amount=180, payment='credit')),
    dict(id='k-te-12', lang='te', kind='story', text='రాజు రెండు కిలోల బియ్యం తీసుకున్నాడు, నూట ఇరవై రూపాయలు, అప్పు',
         expected=dict(customer='రాజు', items=[it(2, 'kg', 'Rice')], amount=120, payment='credit')),
    dict(id='k-kn-13', lang='kn', kind='story', text='ಮಂಜು ಐದು ಕೆಜಿ ಅಕ್ಕಿ ತಗೊಂಡ, ಮುನ್ನೂರು ರೂಪಾಯಿ, ಸಾಲ',
         expected=dict(customer='ಮಂಜು', items=[it(5, 'kg', 'Rice')], amount=300, payment='credit')),
    dict(id='k-hi-14', lang='hi', kind='answer', hint='amount', text='chaar sau pachaas', expected=dict(amount=450)),
    dict(id='k-hi-15', lang='hi', kind='answer', hint='payment', text='udhaar kar do', expected=dict(payment='credit')),
    dict(id='k-en-16', lang='en', kind='answer', hint='items', text='two kilos of sugar and half a kilo of dal',
         expected=dict(items=[it(2, 'kg', 'Sugar'), it(0.5, 'kg', 'Dal')])),
]

health = [
    dict(id='h-hi-01', lang='hi', kind='story', text='Mareez ka naam Ramu hai, umar 45 saal, do din se bukhar aur khansi hai, bukhar 102 tha',
         expected=dict(patient='Ramu', age=45, symptoms=['fever', 'cough'], days=2, temp=102)),
    dict(id='h-hi-02', lang='hi', kind='story', text='मरीज़ का नाम सीता है, उम्र 30 साल, पाँच दिन से दस्त और पेट में दर्द है, गर्भवती है',
         expected=dict(patient='सीता', age=30, symptoms=['diarrhoea', 'stomach_pain'], days=5, pregnant=True)),
    dict(id='h-en-03', lang='en', kind='story', text='Patient is Mohan, 70 years old, breathless since yesterday, some chest pain too',
         expected=dict(patient='Mohan', age=70, symptoms=['breathless', 'chest_pain'], days=1)),
    dict(id='h-en-04', lang='en', kind='story', text='Name Priya, age 8, rash and fever for three days, temperature 100',
         expected=dict(patient='Priya', age=8, symptoms=['rash', 'fever'], days=3, temp=100)),
    dict(id='h-hi-05', lang='hi', kind='story', text='Naam Kamla Devi, 60 saal, ek hafte se chakkar aa rahe hain',
         expected=dict(patient='Kamla Devi', age=60, symptoms=['dizziness'], days=7)),
    dict(id='h-ta-06', lang='ta', kind='story', text='நோயாளி பெயர் செல்வி, வயது 35, இரண்டு நாளாக வாந்தி மற்றும் தலைவலி',
         expected=dict(patient='செல்வி', age=35, symptoms=['vomiting', 'headache'], days=2)),
    dict(id='h-bn-07', lang='bn', kind='story', text='রোগীর নাম মিনা, বয়স ২৮, তিন দিন ধরে জ্বর আর সর্দি',
         expected=dict(patient='মিনা', age=28, symptoms=['fever', 'cold'], days=3)),
    dict(id='h-te-08', lang='te', kind='story', text='పేషెంట్ పేరు లక్ష్మి, వయసు 50, నాలుగు రోజులుగా దగ్గు మరియు జ్వరం',
         expected=dict(patient='లక్ష్మి', age=50, symptoms=['cough', 'fever'], days=4)),
    dict(id='h-mr-09', lang='mr', kind='story', text='रुग्णाचे नाव गणेश, वय 40, दोन दिवसांपासून ताप आणि अंगदुखी',
         expected=dict(patient='गणेश', age=40, symptoms=['fever', 'body_pain'], days=2)),
    dict(id='h-kn-10', lang='kn', kind='story', text='ರೋಗಿಯ ಹೆಸರು ರವಿ, ವಯಸ್ಸು 55, ಮೂರು ದಿನದಿಂದ ಜ್ವರ ಮತ್ತು ಕೆಮ್ಮು',
         expected=dict(patient='ರವಿ', age=55, symptoms=['fever', 'cough'], days=3)),
    dict(id='h-hi-11', lang='hi', kind='answer', hint='age', text='baavan saal', expected=dict(age=52)),
    dict(id='h-hi-12', lang='hi', kind='answer', hint='days', text='teen din se', expected=dict(days=3)),
    dict(id='h-hi-13', lang='hi', kind='answer', hint='pregnant', text='nahi', expected=dict(pregnant=False)),
    dict(id='h-hi-14', lang='hi', kind='story', text='Bachche ka naam Arjun, 5 saal ka, kal se ulti aur dast ho rahe hain',
         expected=dict(patient='Arjun', age=5, symptoms=['vomiting', 'diarrhoea'], days=1)),
]

civic = [
    dict(id='c-hi-01', lang='hi', kind='story', text='Sadak pe bada gaddha hai, station road pe petrol pump ke paas, ward 12, do hafte se, mera number 9812345670',
         expected=dict(issue='pothole', location=['station road'], ward=['12'], since=14, phone='9812345670')),
    dict(id='c-hi-02', lang='hi', kind='story', text='हमारी गली की स्ट्रीट लाइट तीन दिन से बंद है, शिव मंदिर वाली गली, वार्ड 7',
         expected=dict(issue='streetlight', location=['शिव मंदिर'], ward=['7'], since=3)),
    dict(id='c-en-03', lang='en', kind='story', text='There is no water supply for 4 days in Gandhi Nagar, ward 22, my number is 9988001122',
         expected=dict(issue='water', location=['gandhi nagar'], ward=['22'], since=4, phone='9988001122')),
    dict(id='c-en-04', lang='en', kind='story', text='The drain is overflowing near the bus stand, ward 5',
         expected=dict(issue='drainage', location=['bus stand'], ward=['5'])),
    dict(id='c-kn-05', lang='kn', kind='story', text='ನಮ್ಮ ರಸ್ತೆಯಲ್ಲಿ ಕಸ ಬಿದ್ದಿದೆ, ಬಸ್ ನಿಲ್ದಾಣದ ಹತ್ತಿರ, ವಾರ್ಡ್ 18, ಒಂದು ವಾರದಿಂದ',
         expected=dict(issue='garbage', location=['ಬಸ್ ನಿಲ್ದಾಣ'], ward=['18'], since=7)),
    dict(id='c-ta-06', lang='ta', kind='story', text='எங்க தெருவில் குப்பை குவிஞ்சிருக்கு, பள்ளிக்கூடம் பக்கத்துல, வார்டு 9',
         expected=dict(issue='garbage', location=['பள்ளிக்கூட'], ward=['9'])),
    dict(id='c-bn-07', lang='bn', kind='story', text='রাস্তায় বড় গর্ত হয়েছে, বাজারের কাছে, ওয়ার্ড ৩, দশ দিন ধরে',
         expected=dict(issue='pothole', location=['বাজার'], ward=['3'], since=10)),
    dict(id='c-te-08', lang='te', kind='story', text='మా వీధిలో వీధి దీపం పని చేయడం లేదు, గుడి దగ్గర, వార్డు 11',
         expected=dict(issue='streetlight', location=['గుడి'], ward=['11'])),
    dict(id='c-mr-09', lang='mr', kind='story', text='आमच्या गल्लीत पाणी येत नाही, शाळेजवळ, वॉर्ड 4, आठवड्यापासून',
         expected=dict(issue='water', location=['शाळे'], ward=['4'], since=7)),
    dict(id='c-hi-10', lang='hi', kind='answer', hint='ward', text='ward number 15', expected=dict(ward=['15'])),
    dict(id='c-hi-11', lang='hi', kind='answer', hint='phone', text='nau aath saat chhe paanch chaar teen do ek shunya', expected=dict(phone='9876543210')),
    dict(id='c-hi-12', lang='hi', kind='story', text='Naali band hai, Nehru chowk ke paas, ward 30, kal se',
         expected=dict(issue='drainage', location=['nehru chowk'], ward=['30'], since=1)),
]

w('khata', khata)
w('health', health)
w('civic', civic)
print(len(khata), len(health), len(civic))
