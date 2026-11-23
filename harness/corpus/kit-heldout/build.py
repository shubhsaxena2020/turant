# Held-out corpus for the voice kit apps: written AFTER the kit fixes of 23 Nov, in different styles
# (dialect, code-mixing, other word orders, fillers), and NOT to be used for tuning. Score it, record it,
# leave it alone. If you must tune on it, write a new held-out set first.
# Run: python -I build.py -> khata.jsonl, health.jsonl, civic.jsonl
import json, os

HERE = os.path.dirname(os.path.abspath(__file__))


def w(name, rows):
    with open(os.path.join(HERE, name + '.jsonl'), 'w', encoding='utf8', newline='\n') as f:
        for r in rows:
            f.write(json.dumps(r, ensure_ascii=False) + '\n')


def it(qty, unit, item):
    return dict(qty=qty, unit=unit, item=item)


khata = [
    dict(id='kh-hi-01', lang='hi', kind='story', text='haan to likh lo, Mohan ne teen kilo aalu, ek kilo pyaaz liya, kul milake ek sau dus rupaye, baad mein dega',
         expected=dict(customer='Mohan', items=[it(3, 'kg', 'Potato'), it(1, 'kg', 'Onion')], amount=110, payment='credit')),
    dict(id='kh-hi-02', lang='hi', kind='story', text='अनीता जी, 2 किलो चीनी, 1 लीटर तेल, कुल 290, पैसे फोनपे से भेज दिए',
         expected=dict(customer='अनीता', items=[it(2, 'kg', 'Sugar'), it(1, 'L', 'Oil')], amount=290, payment='upi')),
    dict(id='kh-en-03', lang='en', kind='story', text='Write it down: Ravi owes me 650 rupees for 5 kilo rice and 1 kilo dal',
         expected=dict(customer='Ravi', items=[it(5, 'kg', 'Rice'), it(1, 'kg', 'Dal')], amount=650, payment='credit')),
    dict(id='kh-hi-04', lang='hi', kind='story', text='Salim bhai ne apna purana hisaab chukaya, 1200 rupaye cash',
         expected=dict(customer='Salim', amount=1200, payment='repay')),
    dict(id='kh-bn-05', lang='bn', kind='story', text='সুমন এক কেজি চিনি আর দুই প্যাকেট বিস্কুট নিল, একশো বিশ টাকা, পরে দেবে',
         expected=dict(customer='সুমন', items=[it(1, 'kg', 'Sugar'), it(2, 'packet', 'Biscuits')], amount=120, payment='credit')),
    dict(id='kh-ta-06', lang='ta', kind='story', text='செல்வம் இரண்டு லிட்டர் பால் வாங்கினார், எண்பது ரூபாய், ஜிபே மூலம் கொடுத்தார்',
         expected=dict(customer='செல்வம்', items=[it(2, 'L', 'Milk')], amount=80, payment='upi')),
    dict(id='kh-mr-07', lang='mr', kind='story', text='प्रकाश तीन किलो तांदूळ घेऊन गेला, दोनशे दहा रुपये, उधारीत लिहा',
         expected=dict(customer='प्रकाश', items=[it(3, 'kg', 'Rice')], amount=210, payment='credit')),
    dict(id='kh-hi-08', lang='hi', kind='answer', hint='amount', text='dhai sau', expected=dict(amount=250)),
]

health = [
    dict(id='hh-hi-01', lang='hi', kind='story', text='Ji, inka naam Geeta hai, umar pachaas saal, char din se pet dard aur ulti ho rahi hai',
         expected=dict(patient='Geeta', age=50, symptoms=['stomach_pain', 'vomiting'], days=4)),
    dict(id='hh-en-02', lang='en', kind='story', text='This is Rahul, he is 12, coughing for a week, no fever',
         expected=dict(patient='Rahul', age=12, symptoms=['cough'], days=7)),
    dict(id='hh-hi-03', lang='hi', kind='story', text='मरीज़ रमेश, 65 साल, साँस लेने में तकलीफ़ है और सीने में दर्द, कल रात से',
         expected=dict(patient='रमेश', age=65, symptoms=['breathless', 'chest_pain'], days=1)),
    dict(id='hh-ta-04', lang='ta', kind='story', text='பெயர் முத்து, வயது 40, மூன்று நாளாக காய்ச்சல், 101 டிகிரி',
         expected=dict(patient='முத்து', age=40, symptoms=['fever'], days=3, temp=101)),
    dict(id='hh-bn-05', lang='bn', kind='story', text='রোগীর নাম রুমা, বয়স ছাব্বিশ, দুই দিন ধরে মাথা ব্যথা আর মাথা ঘোরা, গর্ভবতী',
         expected=dict(patient='রুমা', age=26, symptoms=['headache', 'dizziness'], days=2, pregnant=True)),
    dict(id='hh-kn-06', lang='kn', kind='story', text='ಹೆಸರು ಶಾಂತಾ, ವಯಸ್ಸು 70, ಒಂದು ವಾರದಿಂದ ಕೆಮ್ಮು ಮತ್ತು ಉಸಿರಾಟದ ತೊಂದರೆ',
         expected=dict(patient='ಶಾಂತಾ', age=70, symptoms=['cough', 'breathless'], days=7)),
    dict(id='hh-hi-07', lang='hi', kind='answer', hint='temp', text='ek sau do degree', expected=dict(temp=102)),
]

civic = [
    dict(id='ch-hi-01', lang='hi', kind='story', text='bhaiya hamare mohalle mein paani nahi aa raha teen din se, Ram nagar, ward number 14',
         expected=dict(issue='water', location=['ram nagar'], ward=['14'], since=3)),
    dict(id='ch-en-02', lang='en', kind='story', text='Streetlight is broken opposite the post office, ward 9, for two weeks now, call me on 9123456780',
         expected=dict(issue='streetlight', location=['post office'], ward=['9'], since=14, phone='9123456780')),
    dict(id='ch-hi-03', lang='hi', kind='story', text='कूड़े का ढेर लगा है सब्ज़ी मंडी के पास, वार्ड 21, एक हफ्ते से कोई नहीं आया',
         expected=dict(issue='garbage', location=['सब्ज़ी मंडी'], ward=['21'], since=7)),
    dict(id='ch-ta-04', lang='ta', kind='story', text='பஸ் ஸ்டாண்ட் அருகில் சாலையில் பெரிய குழி இருக்கு, வார்டு 6',
         expected=dict(issue='pothole', location=['பஸ் ஸ்டாண்ட்'], ward=['6'])),
    dict(id='ch-te-05', lang='te', kind='story', text='మా కాలనీలో డ్రైనేజ్ బ్లాక్ అయింది, పాఠశాల దగ్గర, వార్డు 2, వారం నుంచి',
         expected=dict(issue='drainage', location=['పాఠశాల'], ward=['2'], since=7)),
    dict(id='ch-bn-06', lang='bn', kind='story', text='আমাদের পাড়ায় রাস্তার আলো জ্বলছে না, মসজিদের সামনে, ওয়ার্ড ১২',
         expected=dict(issue='streetlight', location=['মসজিদ'], ward=['12'])),
]

w('khata', khata)
w('health', health)
w('civic', civic)
print(len(khata), len(health), len(civic))
