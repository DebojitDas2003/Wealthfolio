package com.adds.aiwealthmanager

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.ArrowBackIos
import androidx.compose.material.icons.filled.Menu
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.adds.aiwealthmanager.ui.theme.DeepGreen
import com.adds.aiwealthmanager.ui.theme.Purple
import com.adds.aiwealthmanager.ui.theme.Star3
import com.adds.aiwealthmanager.ui.theme.poppinsFontFamily

@Composable
fun CostList() {
    MaterialTheme{
        Surface(modifier = Modifier.fillMaxSize(),
            color = DeepGreen) {


            Star3()

            Column(modifier = Modifier.padding(10.dp)) {
                Spacer(modifier = Modifier.height(10.dp))
                Row(horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier.fillMaxWidth()) {
                    BackButton {}

                    Text(text = "Your Daily Expenses",
                        color = Color.White,
                        fontFamily = poppinsFontFamily,
                        fontWeight = FontWeight.SemiBold,
                        fontSize = 20.sp)

                    MenuButton {}

                }

                Spacer(modifier = Modifier.height(30.dp))



                Surface(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    color = Color.Transparent,
                    shape = MaterialTheme.shapes.medium,
                    border = BorderStroke(2.dp, Color.White)
                ) {
                    Text(
                        text = "Your daily limit Rs. 4000/-",
                        color = Purple,
                        fontFamily = poppinsFontFamily,
                        fontSize = 18.sp,
                        fontWeight = FontWeight.SemiBold,
                        textAlign = TextAlign.Center,
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(16.dp)
                    )
                }




            }
        }
    }
}

@Composable
fun BackButton(onClick: () -> Unit) {
    IconButton(onClick = onClick) {
        Icon(
            imageVector = Icons.Default.ArrowBack,
            contentDescription = "Previous",
            tint = Color.White,
            modifier = Modifier.size(50.dp)
        )
    }
}


@Composable
fun MenuButton(onClick: () -> Unit) {
    IconButton(onClick = onClick) {
        Icon(
            imageVector = Icons.Default.Menu,
            contentDescription = "Previous",
            tint = Color.White,
            modifier = Modifier.size(50.dp)
        )
    }
}



@Preview
@Composable
fun CostListDemo() {
    CostList()
}