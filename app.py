from flask import Flask, render_template, request, send_file
import re
import html
import os
import pandas as pd
from werkzeug.utils import secure_filename

app = Flask(__name__)

@app.route('/')
def upload_file():
   return render_template('upload.html')
	
@app.route('/uploader', methods = ['GET', 'POST'])
def upload_csv_file():
    if request.method == 'POST':
        f = request.files['file']
        f.save(secure_filename(f.filename))
      
        with open(f.filename, 'r') as file:
            text = file.read()
            
        decoded_text = html.unescape(html.unescape(text))
        cleaned_text = re.sub(r'<.*?>', '', re.sub(r'<.*?>', '', decoded_text))
        
        output_file_path = 'cleaned_' + f.filename
        with open(output_file_path, 'w') as file:
            file.write(cleaned_text)

        os.remove(f.filename)  # remove original file after processing

        return send_file(output_file_path, as_attachment=True)

if __name__ == '__main__':
   app.run(debug = True)
