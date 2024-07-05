package com.adds.aiwealthmanager

import android.graphics.Picture
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.adds.aiwealthmanager.ui.theme.DeepGreen
import com.adds.aiwealthmanager.ui.theme.Star
import com.adds.aiwealthmanager.ui.theme.poppinsFontFamily

@Composable
fun IntroPage1() {

        Surface(
            modifier = Modifier
                .fillMaxSize(),
            color = DeepGreen,
        ) {

            Star()

            Column(
                verticalArrangement = Arrangement.Top,
                horizontalAlignment = Alignment.CenterHorizontally,
                ) {
                Image(painter = painterResource(id = R.drawable.robot), contentDescription = "WealthFolio", modifier = Modifier
                    .padding(0.dp, 100.dp, 0.dp, 100.dp)
                    .size(250.dp),)




                val wealthFolio = buildAnnotatedString {
                    withStyle(style = SpanStyle(color = Color.Green, fontFamily = poppinsFontFamily, fontWeight = FontWeight.Bold, fontSize = 30.sp)) {
                        append("Hi!!! ")
                    }
                    withStyle(style = SpanStyle(color = Color.White, fontFamily = poppinsFontFamily, fontWeight = FontWeight.Bold, fontSize = 30.sp)) {
                        append("I am ")
                    }
                    withStyle(style = SpanStyle(color = Color.Green, fontFamily = poppinsFontFamily, fontWeight = FontWeight.Bold, fontSize = 30.sp)) {
                        append("W")
                    }
                    withStyle(style = SpanStyle(color = Color.White, fontFamily = poppinsFontFamily, fontWeight = FontWeight.Bold, fontSize = 30.sp)) {
                        append("ealth")
                    }
                    withStyle(style = SpanStyle(color = Color.Green, fontFamily = poppinsFontFamily, fontWeight = FontWeight.Bold, fontSize = 30.sp)) {
                        append("F")
                    }
                    withStyle(style = SpanStyle(color = Color.White, fontFamily = poppinsFontFamily, fontWeight = FontWeight.Bold, fontSize = 30.sp)) {
                        append("olio")
                    }
                }

                Text(text = wealthFolio)

                Text(text = "your personal ai manager app 🤖",
                    color = Color.White,
                    fontFamily = poppinsFontFamily,
                    fontWeight = FontWeight.Bold,
                    fontSize = 24.sp,
                    modifier = Modifier
                        .padding(30.dp, 10.dp, 30.dp, 100.dp),
                    textAlign = TextAlign.Center)

//                Button(onClick = { /*TODO*/ }) {
//                    Text(text = "Welcome",
//                        fontFamily = poppinsFontFamily,
//                        fontWeight = FontWeight.Bold,
//                        fontSize = 24.sp,)
//                }
            }
        }

}



@Preview
@Composable
fun IntroPage1Demo() {
    IntroPage1()
}