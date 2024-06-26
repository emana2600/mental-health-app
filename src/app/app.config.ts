import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {en_US, provideNzI18n} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {NzMessageModule} from 'ng-zorro-antd/message';


registerLocaleData(en);


export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes), provideNzI18n(en_US),
        importProvidersFrom(FormsModule,
            [
                AngularFireModule.initializeApp({
                    "projectId": "though-cloud",
                    "appId": "1:299154598634:web:dace4946ef9b156412c593",
                    "storageBucket": "though-cloud.appspot.com",
                    "apiKey": "AIzaSyCioW-wY4NI9GU4BsI7QJFfCq-BUQTdHR8",
                    "authDomain": "though-cloud.firebaseapp.com",
                    "messagingSenderId": "299154598634"
                }),
                AngularFirestoreModule,
                AngularFireAuthModule,
                AngularFireStorageModule,
                NzMessageModule
            ]), importProvidersFrom(HttpClientModule), provideAnimations()
    ]
};
