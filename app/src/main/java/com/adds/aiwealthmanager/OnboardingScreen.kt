package com.adds.aiwealthmanager

import android.content.SharedPreferences
import androidx.compose.foundation.background
import androidx.compose.runtime.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBackIos
import androidx.compose.material.icons.filled.ArrowForwardIos
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.tooling.preview.Preview
import androidx.navigation.NavController
import androidx.navigation.compose.rememberNavController
import com.adds.aiwealthmanager.ui.theme.DeepGreen
import com.adds.aiwealthmanager.ui.theme.Purple40
import com.adds.aiwealthmanager.ui.theme.poppinsFontFamily

@Composable
fun OnboardingScreen(navController: NavController, sharedPreferences: SharedPreferences) {
    var currentScreen by remember { mutableStateOf(0) }
    val screens = listOf<@Composable () -> Unit>(
        { IntroPage1() },
        { IntroPage2() },
        { IntroPage3() },
        { IntroPage4() },
        { IntroPage5() }
    )

    MaterialTheme {
        Surface(modifier = Modifier.fillMaxSize(), color = DeepGreen) {
            Column(
                modifier = Modifier.fillMaxSize(),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.SpaceBetween
            ) {
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .fillMaxWidth(),
                    contentAlignment = Alignment.Center
                ) {
                    screens[currentScreen]()
                }

                if (currentScreen == 0) {
                    WelcomeButton(onClick = { currentScreen++ })
                } else {
                    Indicator(
                        pageSize = screens.size,
                        currentPage = currentScreen,
                        onNext = {
                            if (currentScreen < screens.size - 1) {
                                currentScreen++
                            }
                        },
                        onPrev = {
                            if (currentScreen > 0) {
                                currentScreen--
                            }
                        },
                        showNextButton = currentScreen != screens.size - 1,
                        onEnter = {
                            sharedPreferences.edit().putBoolean("OnboardingCompleted", true).apply()
                            navController.navigate("homepage") {
                                popUpTo("onboarding") { inclusive = true }
                            }
                        }
                    )
                }
            }
        }
    }
}

@Composable
fun WelcomeButton(onClick: () -> Unit) {
    Button(onClick = onClick,
        colors = ButtonDefaults.buttonColors(containerColor = Purple40)) {
        Text(text = "Welcome",
            color = Color.White,
            fontFamily = poppinsFontFamily,
            fontWeight = FontWeight.Bold,)
    }
}

@Composable
fun Indicator(
    pageSize: Int,
    currentPage: Int,
    onNext: () -> Unit,
    onPrev: () -> Unit,
    showNextButton: Boolean,
    onEnter: () -> Unit,
    selectedColor: Color = Color.Green,
    unselectedColor: Color = Color.White
) {
    Row(
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically,
        modifier = Modifier.fillMaxWidth()
    ) {
        PrevButton(onClick = onPrev)
        Row(
            horizontalArrangement = Arrangement.Center,
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier.weight(1f)
        ) {
            repeat(pageSize) {
                Box(
                    modifier = Modifier
                        .height(16.dp)
                        .width(if (it == currentPage) 24.dp else 16.dp)
                        .clip(RoundedCornerShape(10.dp))
                        .background(if (it == currentPage) selectedColor else unselectedColor)
                        .padding(4.dp)
                )
            }
        }
        if (showNextButton) {
            NextButton(onClick = onNext)
        } else {
            EnterButton(onClick = onEnter)
        }
    }
}

@Composable
fun NextButton(onClick: () -> Unit) {
    IconButton(onClick = onClick) {
        Icon(
            imageVector = Icons.Default.ArrowForwardIos,
            contentDescription = "Next",
            tint = Color.White
        )
    }
}

@Composable
fun PrevButton(onClick: () -> Unit) {
    IconButton(onClick = onClick) {
        Icon(
            imageVector = Icons.Default.ArrowBackIos,
            contentDescription = "Previous",
            tint = Color.White
        )
    }
}

@Composable
fun EnterButton(onClick: () -> Unit) {
    Button(onClick = onClick,
        colors = ButtonDefaults.buttonColors(containerColor = Purple40)) {
        Text(text = "Enter", color = Color.White)
    }
}

@Preview
@Composable
fun OnboardingScreenDemo() {
    // For preview, we can't use NavController, so this is just a placeholder
    OnboardingScreen(navController = rememberNavController(), sharedPreferences = null!!)
}
