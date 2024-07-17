package com.adds.aiwealthmanager

import android.content.Context
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.navigation.NavGraphBuilder
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navOptions
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import com.adds.aiwealthmanager.ui.theme.AIWealthManagerTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        installSplashScreen()
        setContent {
            AIWealthManagerTheme {
                val navController = rememberNavController()

                // Check if onboarding is completed
                val sharedPreferences = getSharedPreferences("AIWealthManagerPrefs", Context.MODE_PRIVATE)
                val isOnboardingCompleted = sharedPreferences.getBoolean("OnboardingCompleted", false)

                NavHost(
                    navController = navController,
                    startDestination = if (isOnboardingCompleted) "homepage" else "onboarding"
                ) {
                    composable("onboarding") { OnboardingScreen(navController, sharedPreferences) }
                    composable("homepage") { Homepage(navController) }
                    composable("profile") { ProfilePage(navController) }
                    composable("notification") { NotificationPage(navController) }
                }
            }
        }
    }
}
